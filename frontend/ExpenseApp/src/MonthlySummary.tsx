import React, { useEffect, useState } from 'react'; 
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Transaction } from './types';  
import { PieChart } from 'react-native-chart-kit';

interface MonthlySummaryProps {
  transactions: Transaction[];
}

const screenWidth = Dimensions.get('window').width;

const MonthlySummary: React.FC<MonthlySummaryProps> = ({ transactions }) => {
  const [incomeTotal, setIncomeTotal] = useState(0);
  const [expenseTotal, setExpenseTotal] = useState(0);

  useEffect(() => {
    let income = 0;
    let expense = 0;
    transactions.forEach((tx) => {
      if (tx.type === 'income') income += tx.amount;
      else if (tx.type === 'expense') expense += tx.amount;
    });
    setIncomeTotal(income);
    setExpenseTotal(expense);
  }, [transactions]);

  const balance = incomeTotal - expenseTotal;

  const data = [
    {
      name: 'Income',
      amount: incomeTotal,
      color: '#4caf50',
      legendFontColor: '#4caf50',
      legendFontSize: 14,
    },
    {
      name: 'Expense',
      amount: expenseTotal,
      color: '#f44336',
      legendFontColor: '#f44336',
      legendFontSize: 14,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Monthly Summary</Text>
      <View style={styles.summaryRow}>
        <Text style={[styles.summaryText, { color: '#4caf50' }]}>Income: ₹{incomeTotal}</Text>
        <Text style={[styles.summaryText, { color: '#f44336' }]}>Expense: ₹{expenseTotal}</Text>
      </View>
      <Text style={[styles.balance, { color: balance >= 0 ? '#4caf50' : '#f44336' }]}>
        Balance: ₹{balance}
      </Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: 20, padding: 15, backgroundColor: '#fafafa', borderRadius: 8 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 },
  summaryText: { fontSize: 16, fontWeight: '600' },
  balance: { fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
});

export default MonthlySummary;
