// 📄 File: src/PrivacyScreen.tsx

import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';

const PrivacyScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Privacy Policy</Text>
      <Text style={styles.paragraph}>
        Your privacy is important to us. This app does not share your personal data with third parties.
      </Text>
      <Text style={styles.paragraph}>
        We store only the necessary information to help you track your expenses and improve your financial habits.
      </Text>
      <Text style={styles.paragraph}>
        No financial data is shared outside your device unless explicitly backed up to a cloud provider (future feature).
      </Text>
    </ScrollView>
  );
};

export default PrivacyScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f3e8ff',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  paragraph: {
    fontSize: 16,
    color: '#555',
    marginBottom: 12,
    lineHeight: 22,
  },
});
