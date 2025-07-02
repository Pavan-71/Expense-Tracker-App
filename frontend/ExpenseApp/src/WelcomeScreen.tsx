import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const WelcomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>SpendZ </Text>
      <Text style={styles.subtitle}>Track smart. Spend better. Take control of your finances with ease.</Text>

      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.signupButton]}
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3e8ff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 24,
  },
  title: {
    fontSize: 30,
    color: '#4a148c',
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'Montserrat-Italic',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 10,
    lineHeight: 22,
    fontFamily: 'Montserrat-Italic',
  },
  buttonGroup: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#6a1b9a',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 10,
    width: '80%',
    marginBottom: 12,
    elevation: 3,
  },
  signupButton: {
    backgroundColor: '#8e24aa',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Montserrat-Italic',
  },
});
