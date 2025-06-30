// 📄 File: src/SettingsScreen.tsx
import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { AuthContext } from './context/AuthContext';
import { User } from './types'; // ✅ Assuming you have a shared User type

const SettingsScreen = () => {
  const { user, token, login } = useContext(AuthContext);
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState((user as any)?.phone || '');

  const handleSave = async () => {
    try {
      const response = await fetch(`http://10.0.2.2:5000/api/users/me`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username, email, phone }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Profile updated successfully.');
        const updatedUser: User = {
          ...user!,
          username: data.username,
          email: data.email,
          phone: data.phone, // ✅ Add this to your `User` type if missing
        };
        login(token!, updatedUser); // ✅ Sync updated user with context
      } else {
        Alert.alert('Failed', data.message || 'Update failed.');
      }
    } catch (err) {
      Alert.alert('Error', 'Something went wrong.');
    }
  };

  if (user?.isAdmin) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Admins cannot edit profile settings.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>
      <TextInput style={styles.input} value={username} onChangeText={setUsername} placeholder="Name" />
      <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Email" />
      <TextInput style={styles.input} value={phone} onChangeText={setPhone} placeholder="Phone" keyboardType="phone-pad" />
      <Button title="Save Changes" onPress={handleSave} />
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 6,
    padding: 10,
    marginBottom: 15,
  },
});
