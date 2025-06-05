import axios from 'axios';
import { Transaction } from '../types';  

const API_URL = 'http://10.0.2.2:5000/api/transactions'; 

export const getTransactions = async (): Promise<Transaction[]> => {
  const response = await axios.get<Transaction[]>(API_URL);
  return response.data;
};

export const createTransaction = async (transaction: Omit<Transaction, '_id'>): Promise<Transaction> => {
  const response = await axios.post<Transaction>(API_URL, transaction);
  return response.data;
};

export const deleteTransaction = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};

export const updateTransaction = async (
  id: string,
  updatedTransaction: Partial<Omit<Transaction, '_id'>>
): Promise<Transaction> => {
  const response = await axios.put<Transaction>(`${API_URL}/${id}`, updatedTransaction);
  return response.data;
};
