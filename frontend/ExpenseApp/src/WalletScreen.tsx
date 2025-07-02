import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import WalletCard from './WalletCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function WalletScreen() {
  const [balances, setBalances] = useState<number[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [amount, setAmount] = useState('');
  const [actionType, setActionType] = useState<'add' | 'minus'>('add');
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);

  useEffect(() => {
    const loadBalances = async () => {
      const stored = await AsyncStorage.getItem('wallet_balances');
      if (stored) {
        setBalances(JSON.parse(stored));
      } else {
        const defaults = [100000, 100000];
        setBalances(defaults);
        await AsyncStorage.setItem('wallet_balances', JSON.stringify(defaults));
      }
    };
    loadBalances();
  }, []);

  const handleMenuPress = (index: number) => {
    setSelectedCardIndex(index);
    Alert.alert('Wallet Options', 'Choose an action', [
      { text: 'Add Amount', onPress: () => { setActionType('add'); setModalVisible(true); } },
      { text: 'Minus Amount', onPress: () => { setActionType('minus'); setModalVisible(true); } },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const handleSubmit = async () => {
    const num = parseFloat(amount);
    if (isNaN(num)) {
      Alert.alert('Invalid amount');
      return;
    }

    const newBalances = [...balances];
    let newBalance =
      actionType === 'add'
        ? newBalances[selectedCardIndex] + num
        : newBalances[selectedCardIndex] - num;
    if (newBalance < 0) newBalance = 0;
    newBalances[selectedCardIndex] = newBalance;

    setBalances(newBalances);
    await AsyncStorage.setItem('wallet_balances', JSON.stringify(newBalances));
    setModalVisible(false);
    setAmount('');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Your Wallets</Text>

      <WalletCard
        cardNumber="4187 3064 3917 7401"
        cardHolder="Pavan Saketh"
        expiry="05/29"
        balance={balances[0] || 0}
        brand="Visa"
        onMenuPress={() => handleMenuPress(0)}
      />

      <View style={{ height: 24 }} />

      <WalletCard
        cardNumber="5290 2245 1992 8831"
        cardHolder="Pavan Saketh"
        expiry="06/30"
        balance={balances[1] || 0}
        brand="MasterCard"
        onMenuPress={() => handleMenuPress(1)}
      />

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {actionType === 'add' ? 'Add Amount' : 'Minus Amount'}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter amount"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
              placeholderTextColor="#aaa"
            />
            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3e8ff',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4a148c',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    width: '85%',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    color: '#333',
    fontSize: 16,
  },
  submitBtn: {
    backgroundColor: '#8854d0',
    paddingVertical: 12,
    paddingHorizontal: 26,
    borderRadius: 10,
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  cancelText: {
    marginTop: 12,
    color: '#666',
    fontSize: 14,
  },
});
