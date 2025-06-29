// 📄 File: src/AddTransactionScreen.tsx

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Transaction } from './types';
import { getTransactions } from './api/transactions';
import { RootStackParamList } from '../App';

export default function AddTransactionScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const data = await getTransactions();
      setTransactions(data.slice(-5).reverse());
    };
    fetch();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.toggleRow}>
        <TouchableOpacity
          style={[styles.toggleBtn, { backgroundColor: '#8854d0' }]}
          onPress={() => navigation.navigate('AddForm', { type: 'income' })}
        >
          <Text style={styles.toggleText}>Add Income</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.toggleBtn, { backgroundColor: '#ff6b00' }]}
          onPress={() => navigation.navigate('AddForm', { type: 'expense' })}
        >
          <Text style={styles.toggleText}>Add Expense</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subTitle}>Last Added</Text>
      <FlatList
        data={transactions}
        keyExtractor={item => item._id || Math.random().toString()}
        renderItem={({ item }) => (
          <View style={styles.transactionCard}>
            <View>
              <Text style={styles.category}>{item.category}</Text>
              <Text style={styles.date}>{new Date(item.date).toLocaleDateString()}</Text>
            </View>
            <Text style={{
              color: item.type === 'income' ? '#4caf50' : '#f44336',
              fontWeight: 'bold',
            }}>
              {item.type === 'income' ? '+' : '-'}₹{item.amount}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  toggleBtn: {
    flex: 1,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  toggleText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  transactionCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  category: {
    fontSize: 16,
    fontWeight: '600',
  },
  date: {
    color: '#888',
    fontSize: 13,
  },
});
