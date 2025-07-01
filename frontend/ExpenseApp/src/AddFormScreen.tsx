import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { createTransaction } from './api/transactions';
import { RootStackParamList } from '../App';

type AddFormRouteProp = RouteProp<RootStackParamList, 'AddForm'>;

export default function AddFormScreen() {
  const navigation = useNavigation();
  const route = useRoute<AddFormRouteProp>();
  const defaultType = route.params.type;

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedType, setSelectedType] = useState<'income' | 'expense'>(defaultType);

  const handleAddTransaction = async () => {
    if (!title || !amount) {
      return Alert.alert('Please fill in all required fields');
    }

    try {
      await createTransaction({
        type: selectedType,
        title,
        category: selectedType, 
        amount: parseFloat(amount),
        description,
        date: date.toISOString(),
      });

      Alert.alert('Success', `${selectedType} added successfully`);
      navigation.goBack();
    } catch (error) {
      console.error('Failed to add:', error);
      Alert.alert('Error', 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        {selectedType === 'income' ? 'Add Income' : 'Add Expense'}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={styles.input}
        placeholder="Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={styles.dateButton}
      >
        <Text style={styles.dateText}>Select Date: {date.toLocaleDateString()}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          onChange={(_, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Description (optional)"
        value={description}
        onChangeText={setDescription}
      />

      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            selectedType === 'income' && styles.selectedButton,
          ]}
          onPress={() => setSelectedType('income')}
        >
          <Text
            style={[
              styles.toggleText,
              selectedType === 'income' && styles.selectedText,
            ]}
          >
            Income
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            selectedType === 'expense' && styles.selectedButton,
          ]}
          onPress={() => setSelectedType('expense')}
        >
          <Text
            style={[
              styles.toggleText,
              selectedType === 'expense' && styles.selectedText,
            ]}
          >
            Expense
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.submitButton, { backgroundColor: '#4a148c' }]}
        onPress={handleAddTransaction}
      >
        <Text style={styles.submitText}>Add {selectedType}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f3e8ff' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  dateButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#f0f0f0',
  },
  dateText: { color: '#333' },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#e0d7f5',
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#4a148c',
    borderColor: '#4a148c',
  },
  toggleText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  selectedText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  submitButton: {
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
