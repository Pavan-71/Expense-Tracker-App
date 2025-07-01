import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { BarChart } from 'react-native-chart-kit';
import { Transaction } from './types';
import { RootStackParamList } from '../App';

type OverviewRouteProp = RouteProp<RootStackParamList, 'Overview'>;
const screenWidth = Dimensions.get('window').width;

export default function OverviewScreen() {
  const route = useRoute<OverviewRouteProp>();
  const transactions: Transaction[] = route.params?.transactions || [];

  const [selectedType, setSelectedType] = useState<'income' | 'expense'>('income');

  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const diff = income - expense;
  const filtered = transactions.filter(t => t.type === selectedType);

  return (
    <View style={styles.container}>
      <Text style={styles.diffText}>
        Difference (Income - Expense): ₹{diff}
      </Text>

      <BarChart
  data={{
    labels: ['Income', 'Expense'],
    datasets: [{ data: [income, expense] }],
  }}
  width={screenWidth - 40}
  height={220}
  chartConfig={{
    backgroundGradientFrom: '#f3f3f3',
    backgroundGradientTo: '#f3f3f3',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(136, 84, 208, ${opacity})`,
    labelColor: () => '#333',
  }}
  style={{ marginTop: 20, borderRadius: 12 }}
  fromZero
  showValuesOnTopOfBars
  yAxisLabel="₹"
  yAxisSuffix="" 
/>


      <View style={styles.toggleRow}>
        <TouchableOpacity
          style={[styles.toggleBtn, selectedType === 'income' && styles.activeBtn]}
          onPress={() => setSelectedType('income')}
        >
          <Text style={[styles.toggleText, selectedType === 'income' && styles.activeText]}>
            Income
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.toggleBtn, selectedType === 'expense' && styles.activeBtn]}
          onPress={() => setSelectedType('expense')}
        >
          <Text style={[styles.toggleText, selectedType === 'expense' && styles.activeText]}>
            Expense
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item._id || Math.random().toString()}
        renderItem={({ item }) => (
          <View style={styles.logCard}>
            <View>
              <Text style={styles.logCategory}>{item.title || '(No Title)'}</Text>
              <Text style={styles.logDate}>
                {new Date(item.date).toLocaleDateString()}
              </Text>
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
        contentContainerStyle={{ paddingBottom: 50 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 10,
    backgroundColor: '#f3e8ff',
  },
  diffText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
    color: '#555',
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  toggleBtn: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#eee',
    marginHorizontal: 10,
  },
  toggleText: {
    fontSize: 14,
    color: '#555',
  },
  activeBtn: {
    backgroundColor: '#8854d0',
  },
  activeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  logCard: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    marginVertical: 6,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logCategory: {
    fontSize: 16,
    fontWeight: '600',
  },
  logDate: {
    fontSize: 12,
    color: '#888',
  },
});
