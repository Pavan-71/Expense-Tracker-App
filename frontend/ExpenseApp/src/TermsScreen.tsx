// 📄 File: src/TermsScreen.tsx

import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';

const TermsScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Terms & Conditions</Text>
      <Text style={styles.paragraph}>
        By using this app, you agree to our terms of service. You must not use this app for illegal purposes.
      </Text>
      <Text style={styles.paragraph}>
        All features are provided as-is without guarantees. Your data is stored securely but we do not accept liability for data loss.
      </Text>
      <Text style={styles.paragraph}>
        These terms may be updated at any time without prior notice. Please check regularly for updates.
      </Text>
    </ScrollView>
  );
};

export default TermsScreen;

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
