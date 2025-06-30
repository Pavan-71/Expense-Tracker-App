// 📄 File: src/ProfileScreen.tsx

import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { AuthContext } from './context/AuthContext';

const ProfileScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { user, logout } = useContext(AuthContext);

  const accountType = user?.isAdmin ? 'ADMIN' : 'USER';

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: logout },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('../assets/profile-placeholder.png')}
        style={styles.avatar}
      />
      <Text style={styles.name}>{user?.username}</Text>
      <Text style={styles.email}>{user?.email}</Text>
      <Text style={styles.info}>{user?.phone || 'Phone not available'}</Text>
      <Text style={styles.info}>Account Type: {accountType}</Text>

      <View style={styles.divider} />

      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Terms')}>
        <Text style={styles.optionText}>📄 Terms & Conditions</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Help')}>
        <Text style={styles.optionText}>❓ Help / FAQs</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Privacy')}>
        <Text style={styles.optionText}>🔐 Privacy Policy</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Settings')}>
        <Text style={styles.optionText}>⚙️ Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.option, { backgroundColor: '#fee2e2' }]} onPress={handleLogout}>
        <Text style={[styles.optionText, { color: '#b91c1c' }]}>🚪 Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3e8ff',
    alignItems: 'center',
    padding: 24,
    paddingBottom: 100,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
    marginTop: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  info: {
    fontSize: 16,
    color: '#555',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 20,
  },
  option: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  settingsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: '#555',
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginVertical: 2,
  },
});
