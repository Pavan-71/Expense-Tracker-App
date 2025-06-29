// 📄 File: src/AddFormScreen.tsx

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
  const { type } = route.params;

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleAddTransaction = async () => {
    if (!title || !amount || !category) {
      return Alert.alert('Please fill in all required fields');
    }

    try {
      await createTransaction({
        type,
        title,
        category,
        amount: parseFloat(amount),
        description,
        date: date.toISOString(),
      });

      Alert.alert('Success', `${type} added successfully`);
      navigation.goBack();
    } catch (error) {
      console.error('Failed to add:', error);
      Alert.alert('Error', 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{type === 'income' ? 'Add Income' : 'Add Expense'}</Text>

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

      <TextInput
        style={styles.input}
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
      />

      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateButton}>
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

      <TouchableOpacity
        style={[
          styles.submitButton,
          { backgroundColor: type === 'income' ? '#8854d0' : '#ff6b00' },
        ]}
        onPress={handleAddTransaction}
      >
        <Text style={styles.submitText}>Add {type === 'income' ? 'Income' : 'Expense'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
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
  submitButton: {
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
