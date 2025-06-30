import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Transaction } from '../types';

const API_URL = 'http://10.0.2.2:5000/api/transactions';

// ✅ Get auth headers with token
const getAuthHeaders = async () => {
  const token = await AsyncStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getTransactions = async (): Promise<Transaction[]> => {
  const config = await getAuthHeaders();
  const response = await axios.get<Transaction[]>(API_URL, config);
  return response.data;
};

export const createTransaction = async (transaction: Omit<Transaction, '_id'>): Promise<Transaction> => {
  const config = await getAuthHeaders();
  const response = await axios.post<Transaction>(API_URL, transaction, config);
  return response.data;
};

export const deleteTransaction = async (id: string): Promise<void> => {
  const config = await getAuthHeaders();
  await axios.delete(`${API_URL}/${id}`, config);
};

export const updateTransaction = async (
  id: string,
  updatedTransaction: Partial<Omit<Transaction, '_id'>>
): Promise<Transaction> => {
  const config = await getAuthHeaders();
  const response = await axios.put<Transaction>(`${API_URL}/${id}`, updatedTransaction, config);
  return response.data;
};
