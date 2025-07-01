import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { AuthContext } from './context/AuthContext';
import { User } from './types';
import Icon from 'react-native-vector-icons/Ionicons';

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
        Alert.alert('✅ Success', 'Profile updated successfully.');
        const updatedUser: User = {
          ...user!,
          username: data.username,
          email: data.email,
          phone: data.phone,
        };
        login(token!, updatedUser);
      } else {
        Alert.alert('❌ Failed', data.message || 'Update failed.');
      }
    } catch (err) {
      Alert.alert('⚠️ Error', 'Something went wrong.');
    }
  };

  if (user?.isAdmin) {
    return (
      <View style={styles.container}>
        <View style={styles.lockCard}>
          <Icon name="lock-closed-outline" size={28} color="#8854d0" />
          <Text style={styles.disabledText}>
            Admins cannot edit profile settings.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Edit Your Profile</Text>

        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Icon name="save-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3e8ff',
    alignItems: 'center',
    padding: 20,
    justifyContent: 'flex-start',
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginTop: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#6a1b9a',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  lockCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginTop: 60,
  },
  disabledText: {
    color: '#666',
    fontSize: 16,
  },
});
