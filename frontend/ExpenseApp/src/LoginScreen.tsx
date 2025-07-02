import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { AuthContext } from './context/AuthContext';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://10.0.2.2:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.token && data.user) {
        await login(data.token, data.user);
        navigation.replace('Home');
      } else {
        Alert.alert('Login Failed', data.message || 'Invalid credentials');
      }
    } catch (err) {
      console.error('Login error:', err);
      Alert.alert('Error', 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#f3e8ff', '#d1b3ff']} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.card}>
            <Text style={styles.title}>Welcome Back 👋</Text>

            <View style={styles.inputContainer}>
              <Icon name="mail" size={20} color="#6a1b9a" />
              <TextInput
                placeholder="Email"
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholderTextColor="#888"
              />
            </View>

            <View style={styles.inputContainer}>
              <Icon name="lock" size={20} color="#6a1b9a" />
              <TextInput
                placeholder="Password"
                secureTextEntry
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                placeholderTextColor="#888"
              />
            </View>

            <TouchableOpacity
              style={[
                styles.loginButton,
                !(email && password) && { opacity: 0.5 },
              ]}
              onPress={handleLogin}
              disabled={loading || !email || !password}
            >
              <Text style={styles.buttonText}>
                {loading ? 'Logging in...' : 'Login'}
              </Text>
            </TouchableOpacity>

            <Text
              style={styles.link}
              onPress={() => navigation.replace('Signup')}
            >
              Don't have an account? Sign up
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 60,
  },
  card: {
    backgroundColor: '#fff',
    padding: 26,
    borderRadius: 18,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  title: {
    fontSize: 26,
    textAlign: 'center',
    marginBottom: 24,
    color: '#6a1b9a',
    fontFamily: 'Montserrat Bold Italic',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3e8ff',
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e0d7f5',
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: '#333',
    fontFamily: 'Montserrat',
  },
  loginButton: {
    backgroundColor: '#6a1b9a',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Montserrat',
  },
  link: {
    color: '#6a1b9a',
    textAlign: 'center',
    marginTop: 20,
    textDecorationLine: 'underline',
    fontFamily: 'Montserrat Italic',
  },
});
