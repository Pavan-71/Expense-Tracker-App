import React from 'react';
import { View, Text, Dimensions, StyleSheet, Button } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import { Transaction } from './types';

const screenWidth = Dimensions.get('window').width;

type PieChartRouteProp = RouteProp<RootStackParamList, 'PieChart'>;

export default function PieChartScreen() {
  const navigation = useNavigation();
  const route = useRoute<PieChartRouteProp>();
  const transactions = route.params?.transactions || [];

  const totalIncome = transactions
    .filter((t: Transaction) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t: Transaction) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  const data = [
    {
      name: 'Income',
      amount: totalIncome,
      color: '#4CAF50',
      legendFontColor: '#333',
      legendFontSize: 15,
    },
    {
      name: 'Expense',
      amount: totalExpense,
      color: '#F44336',
      legendFontColor: '#333',
      legendFontSize: 15,
    },
    {
      name: 'Balance',
      amount: balance > 0 ? balance : 0,
      color: '#2196F3',
      legendFontColor: '#333',
      legendFontSize: 15,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Monthly Summary</Text>

      <PieChart
        data={data}
        width={screenWidth - 40}
        height={220}
        chartConfig={{
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="amount"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />

      <Button title="Back to Transactions" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
});
