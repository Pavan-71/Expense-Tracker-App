import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import { createTransaction } from './api/transactions';

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
      return Alert.alert('Missing Fields', 'Please fill in Title and Amount');
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
      console.error('Add Transaction Error:', error);
      Alert.alert('Error', 'Something went wrong while saving');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#f3e8ff' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <Text style={styles.header}>
            {selectedType === 'income' ? 'Add Income' : 'Add Expense'}
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
            placeholderTextColor="#999"
          />

          <TextInput
            style={styles.input}
            placeholder="Amount"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
            placeholderTextColor="#999"
          />

          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={styles.dateButton}
          >
            <Text style={styles.dateText}>Date: {date.toLocaleDateString()}</Text>
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
            placeholderTextColor="#999"
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

          <TouchableOpacity style={styles.submitButton} onPress={handleAddTransaction}>
            <Text style={styles.submitText}>Add {selectedType}</Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 100,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4a148c',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
  },
  dateButton: {
    backgroundColor: '#e5dbff',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginBottom: 15,
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 10,
  },
  toggleButton: {
    flex: 1,
    backgroundColor: '#d1c4e9',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#4a148c',
  },
  toggleText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
  },
  selectedText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#4a148c',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
