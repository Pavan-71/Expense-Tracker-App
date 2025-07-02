// Same imports as before
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  ScrollView,
  Alert,
  View as RNView,
} from 'react-native';
import {
  Surface,
  Text,
  Title,
  Divider,
  useTheme,
  IconButton,
  Banner,
  List,
  FAB,
} from 'react-native-paper';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { getTransactions, deleteTransaction } from './api/transactions';
import { Transaction } from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SideBarWrapper from './SideBarWrapper';

export default function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const isFocused = useIsFocused();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [hasUnreadTips, setHasUnreadTips] = useState(false);

  const balance = income - expense;

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

  return (
    <SideBarWrapper
      notificationDot={hasUnreadTips}
      onNotificationPress={() => navigation.navigate('Notification')}
      transactions={transactions}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Balance Summary */}
          <Surface style={styles.balanceCard} elevation={4}>
            <Text style={styles.balanceTitle}>Current Balance</Text>
            <Title style={styles.balanceAmount}>₹ {balance}</Title>
            <RNView style={styles.row}>
              <Text style={styles.income}>Income: ₹{income}</Text>
              <Text style={styles.expense}>Expense: ₹{expense}</Text>
            </RNView>
          </Surface>

          {/* Insight Banner */}
          {hasUnreadTips && (
            <Banner
              visible
              actions={[
                {
                  label: 'View Tips',
                  onPress: () => navigation.navigate('Notification'),
                },
              ]}
              icon="lightbulb-on-outline"
            >
              You have unread financial tips! Check them out.
            </Banner>
          )}

          {/* Transaction List */}
          <Title style={styles.sectionTitle}>Recent Transactions</Title>
          {transactions.map((item) => (
            <Surface key={item._id} style={styles.transactionItem} elevation={2}>
              <List.Item
                title={item.title || '(Untitled)'}
                description={new Date(item.date).toLocaleDateString()}
                right={() => (
                  <RNView style={{ alignItems: 'flex-end' }}>
                    <Text style={{
                      color: item.type === 'income' ? '#4caf50' : '#f44336',
                      fontWeight: 'bold',
                    }}>
                      {item.type === 'income' ? '+' : '-'}₹{item.amount}
                    </Text>
                    <IconButton icon="delete-outline" size={20} onPress={() => handleDelete(item._id!)} />
                  </RNView>
                )}
              />
              <Divider />
            </Surface>
          ))}
        </ScrollView>

        {/* FAB + Bottom Nav */}
        <FAB
          icon="plus"
          style={styles.fab}
          onPress={() => navigation.navigate('AddTransaction')}
          color="#fff"
        />

        <Surface style={styles.footerNav} elevation={4}>
          <IconButton icon="home-outline" onPress={() => {}} />
          <IconButton icon="chart-bar" onPress={() => navigation.navigate('Overview', { transactions })} />
          <IconButton icon="wallet-outline" onPress={() => navigation.navigate('Wallet')} />
          <IconButton icon="account-outline" onPress={() => navigation.navigate('Profile')} />
        </Surface>
      </SafeAreaView>
    </SideBarWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3e8ff',
    paddingHorizontal: 16,
  },
  balanceCard: {
    marginTop: 16,
    borderRadius: 16,
    padding: 20,
    backgroundColor: '#e6d4ff',
  },
  balanceTitle: {
    fontSize: 16,
    color: '#555',
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  income: {
    color: '#2e7d32',
    fontWeight: '500',
  },
  expense: {
    color: '#c62828',
    fontWeight: '500',
  },
  sectionTitle: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: 'bold',
  },
  transactionItem: {
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: '#fff',
  },
  fab: {
    position: 'absolute',
    bottom: 80,
    alignSelf: 'center',
    backgroundColor: '#8854d0',
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
  },
});
