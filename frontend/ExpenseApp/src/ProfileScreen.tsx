// 📄 File: src/ProfileScreen.tsx

import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

const ProfileScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const user = {
    name: 'Pavan Saketh',
    email: 'Pavansaketh4003@gmail.com',
    phone: '+91 9959509609',
    isAdmin: true,
  };

  const accountType = user.isAdmin ? 'ADMIN' : 'USER';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('../assets/profile-placeholder.png')}
        style={styles.avatar}
      />
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.email}>{user.email}</Text>
      <Text style={styles.info}>{user.phone}</Text>
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

      <View style={styles.divider} />

      <Text style={styles.settingsTitle}>Settings</Text>
      <Text style={styles.label}>• Edit profile (coming soon)</Text>
      <Text style={styles.label}>• Change phone number</Text>
      <Text style={styles.label}>• Update email</Text>
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
