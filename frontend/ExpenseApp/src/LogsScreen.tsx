import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { Transaction } from './types';
import { getTransactions } from './api/transactions';

export default function LogsScreen() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTransactions();
      setTransactions(data);
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>All Transactions</Text>
      <FlatList
        data={transactions}
        keyExtractor={item => item._id || Math.random().toString()}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              
              <Text style={styles.category}>{item.title}</Text>
              <Text style={styles.date}>{new Date(item.date).toLocaleDateString()}</Text>
            </View>
            <Text
              style={{
                color: item.type === 'income' ? '#4caf50' : '#f44336',
                fontWeight: 'bold',
              }}
            >
              ₹{item.amount}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f3e8ff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 2,
  },
  category: {
    fontSize: 16,
    fontWeight: '600',
  },
  date: {
    fontSize: 12,
    color: '#666',
  },
});
