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
      <WalletCard
        cardNumber="4187 3064 3917 7401"
        cardHolder="Pavan Saketh"
        expiry="05/29"
        balance={balances[0] || 0}
        brand="Visa" 
        onMenuPress={() => handleMenuPress(0)}
      />

      <View style={{ height: 20 }} />

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
            />
            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={{ marginTop: 10, color: '#999' }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f3e8ff' },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  submitBtn: {
    backgroundColor: '#8854d0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
});
