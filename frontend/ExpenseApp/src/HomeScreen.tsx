import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getTransactions, deleteTransaction } from './api/transactions';
import { Transaction } from './types';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../App';
import SideBarWrapper from './SideBarWrapper';

const screenWidth = Dimensions.get('window').width;

export default function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const isFocused = useIsFocused();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [hasUnreadTips, setHasUnreadTips] = useState(false);

  const fetchTransactions = async () => {
    const data = await getTransactions();
    setTransactions(data);

    const incomeTotal = data.filter(t => t.type === 'income').reduce((a, b) => a + b.amount, 0);
    const expenseTotal = data.filter(t => t.type === 'expense').reduce((a, b) => a + b.amount, 0);

    setIncome(incomeTotal);
    setExpense(expenseTotal);

    const unread = await AsyncStorage.getItem('hasUnreadTips');
    setHasUnreadTips(unread === 'true');
  };

  useEffect(() => {
    if (isFocused) fetchTransactions();
  }, [isFocused]);

  const handleDelete = (id: string) => {
    Alert.alert('Delete', 'Are you sure you want to delete this transaction?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await deleteTransaction(id);
          fetchTransactions(); 
        },
      },
    ]);
  };

  const balance = income - expense;

  return (
    <SideBarWrapper
      notificationDot={hasUnreadTips}
      onNotificationPress={() => navigation.navigate('Notification')}
      transactions={transactions}
    >
      <SafeAreaView style={styles.container}>
        <LinearGradient colors={['#b18aff', '#e6d4ff']} style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>
            Your Balance <Icon name="chevron-down" size={18} />
          </Text>
          <Text style={styles.balanceAmount}>₹ {balance}</Text>
          <View style={styles.rowBetween}>
            <Text style={[styles.incomeExpense, { color: '#2c2c2c' }]}>Income: ₹{income}</Text>
            <Text style={[styles.incomeExpense, { color: '#2c2c2c' }]}>Expense: ₹{expense}</Text>
          </View>
        </LinearGradient>

        <Text style={styles.sectionTitle}>Transactions</Text>
        <FlatList
          data={transactions}
          keyExtractor={item => item._id || Math.random().toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
          renderItem={({ item }) => (
            <View style={styles.transactionCard}>
              <View>
                <Text style={styles.category}>{item.title || '(Untitled)'}</Text>
                <Text style={{ color: '#666' }}>{new Date(item.date).toLocaleDateString()}</Text>
              </View>
              <View style={styles.rightSection}>
                <Text
                  style={{
                    color: item.type === 'income' ? '#4caf50' : '#f44336',
                    fontWeight: 'bold',
                    marginRight: 12,
                  }}
                >
                  {item.type === 'income' ? '+' : '-'}₹{item.amount}
                </Text>
                <TouchableOpacity onPress={() => handleDelete(item._id!)}>
                  <Icon name="trash-outline" size={22} color="#888" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />

        <View style={styles.footerNav}>
          <TouchableOpacity>
            <Icon name="home" size={24} color="#555" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Overview', { transactions })}>
            <Icon name="bar-chart-outline" size={24} color="#555" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.plusIconWrapper}
            onPress={() => navigation.navigate('AddTransaction')}
          >
            <Icon name="add" size={28} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Wallet')}>
            <Icon name="wallet-outline" size={24} color="#555" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Icon name="person-outline" size={24} color="#555" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SideBarWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3e8ff', padding: 20, paddingTop: 25 },
  balanceCard: { borderRadius: 16, padding: 20, marginBottom: 20 },
  balanceLabel: { fontSize: 16, fontWeight: '500', color: '#333' },
  balanceAmount: { fontSize: 32, fontWeight: 'bold', marginVertical: 10 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between' },
  incomeExpense: { fontSize: 16, fontWeight: '500' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  transactionCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3,
  },
  category: { fontSize: 16, fontWeight: '600' },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerNav: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    elevation: 10,
  },
  plusIconWrapper: {
    backgroundColor: '#8854d0',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -30,
  },
});
