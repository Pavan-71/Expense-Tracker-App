import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  Button,
  Alert,
  Pressable,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import {
  getTransactions,
  createTransaction,
  deleteTransaction,
  updateTransaction,
} from './api/transactions';
import { Transaction } from './types';
import { RootStackParamList } from '../App';

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [editTransaction, setEditTransaction] = useState<Transaction | null>(null);
  const [editAmount, setEditAmount] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editType, setEditType] = useState('');
  const [editDate, setEditDate] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const data = await getTransactions();
      setTransactions(data);
    } catch (error) {
      console.error('Failed to load transactions:', error);
      Alert.alert('Error', 'Failed to load transactions.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleAddTransaction = async () => {
    if (!amount || !category || !type || !date) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    const typeLower = type.toLowerCase();
    if (typeLower !== 'income' && typeLower !== 'expense') {
      Alert.alert('Error', "Type must be 'income' or 'expense'");
      return;
    }

    try {
      const newTransaction: Omit<Transaction, '_id'> = {
        amount: Number(amount),
        category,
        type: typeLower as 'income' | 'expense',
        date,
        description,
      };
      await createTransaction(newTransaction);
      Alert.alert('Success', 'Transaction added!');
      setAmount('');
      setCategory('');
      setType('');
      setDate('');
      setDescription('');
      fetchTransactions();
    } catch (error) {
      console.error('Failed to add transaction:', error);
      Alert.alert('Error', 'Failed to add transaction.');
    }
  };

  const handleDelete = async (id: string) => {
    Alert.alert('Confirm Delete', 'Are you sure you want to delete this transaction?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteTransaction(id);
            Alert.alert('Deleted', 'Transaction deleted successfully.');
            fetchTransactions();
          } catch (error) {
            console.error('Failed to delete transaction:', error);
            Alert.alert('Error', 'Failed to delete transaction.');
          }
        },
      },
    ]);
  };

  const openEditModal = (transaction: Transaction) => {
    setEditTransaction(transaction);
    setEditAmount(transaction.amount.toString());
    setEditCategory(transaction.category);
    setEditType(transaction.type);
    setEditDate(transaction.date.slice(0, 10));
    setEditDescription(transaction.description ?? '');
    setModalVisible(true);
  };

  const handleEditSave = async () => {
    if (!editAmount || !editCategory || !editType || !editDate || !editTransaction) {
      Alert.alert('Error', 'Please fill all required fields in edit form.');
      return;
    }
    const typeLower = editType.toLowerCase();
    if (typeLower !== 'income' && typeLower !== 'expense') {
      Alert.alert('Error', "Type must be 'income' or 'expense'");
      return;
    }

    try {
      await updateTransaction(editTransaction._id!, {
        amount: Number(editAmount),
        category: editCategory,
        type: typeLower as 'income' | 'expense',
        date: editDate,
        description: editDescription,
      });
      Alert.alert('Success', 'Transaction updated!');
      setModalVisible(false);
      setEditTransaction(null);
      fetchTransactions();
    } catch (error) {
      console.error('Failed to update transaction:', error);
      Alert.alert('Error', 'Failed to update transaction.');
    }
  };

  const TransactionItem = ({ item }: { item: Transaction }) => {
    const [menuVisible, setMenuVisible] = useState(false);

    return (
      <View style={styles.transactionItem}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Text style={styles.category}>{item.category}</Text>
            <Text style={styles.amount}>₹ {item.amount}</Text>
            {item.description ? <Text>{item.description}</Text> : null}
            <Text style={styles.date}>{new Date(item.date).toLocaleDateString()}</Text>
          </View>

          <View style={{ position: 'relative' }}>
            <Pressable onPress={() => setMenuVisible(!menuVisible)} style={styles.menuButton}>
              <Text style={{ fontSize: 24, fontWeight: 'bold' }}>⋮</Text>
            </Pressable>

            {menuVisible && (
              <View style={styles.menu}>
                <TouchableOpacity
                  onPress={() => {
                    setMenuVisible(false);
                    openEditModal(item);
                  }}
                  style={styles.menuItem}
                >
                  <Text>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setMenuVisible(false);
                    handleDelete(item._id!);
                  }}
                  style={[styles.menuItem, styles.menuItemLast]}
                >
                  <Text style={{ color: 'red' }}>Delete</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Add Transaction</Text>
      <TextInput placeholder="Amount" keyboardType="numeric" value={amount} onChangeText={setAmount} style={styles.input} />
      <TextInput placeholder="Category" value={category} onChangeText={setCategory} style={styles.input} />
      <TextInput placeholder="Type (income/expense)" value={type} onChangeText={setType} style={styles.input} />
      <TextInput placeholder="Date (YYYY-MM-DD)" value={date} onChangeText={setDate} style={styles.input} />
      <TextInput placeholder="Description" value={description} onChangeText={setDescription} style={styles.input} />
      <Button title="Add Transaction" onPress={handleAddTransaction} />

      <View style={{ marginVertical: 15 }}>
        <Button
          title="View Pie Chart"
          onPress={() => navigation.navigate('PieChart', { transactions })}
        />
      </View>

      <Text style={styles.title}>Your Transactions</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : transactions.length === 0 ? (
        <Text>No transactions found.</Text>
      ) : (
        <FlatList
          data={transactions}
          keyExtractor={(item) => item._id ?? Math.random().toString()}
          renderItem={({ item }) => <TransactionItem item={item} />}
        />
      )}

      {/* Edit Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Edit Transaction</Text>
            <TextInput
              placeholder="Amount"
              keyboardType="numeric"
              value={editAmount}
              onChangeText={setEditAmount}
              style={styles.input}
            />
            <TextInput
              placeholder="Category"
              value={editCategory}
              onChangeText={setEditCategory}
              style={styles.input}
            />
            <TextInput
              placeholder="Type (income/expense)"
              value={editType}
              onChangeText={setEditType}
              style={styles.input}
            />
            <TextInput
              placeholder="Date (YYYY-MM-DD)"
              value={editDate}
              onChangeText={setEditDate}
              style={styles.input}
            />
            <TextInput
              placeholder="Description"
              value={editDescription}
              onChangeText={setEditDescription}
              style={styles.input}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Button title="Cancel" onPress={() => setModalVisible(false)} />
              <Button title="Save" onPress={handleEditSave} />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginVertical: 15 },
  transactionItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  category: { fontSize: 18, fontWeight: '600' },
  amount: { fontSize: 16, color: 'green', marginTop: 5 },
  date: { fontSize: 14, color: '#666', marginTop: 3 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  menuButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  menu: {
    position: 'absolute',
    right: 0,
    top: 30,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    zIndex: 10,
    elevation: 5,
    width: 120,
  },
  menuItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  menuItemLast: {
    borderBottomWidth: 0,
    backgroundColor: '#fff',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
  },
});
