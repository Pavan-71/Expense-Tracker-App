// 📄 File: src/HelpScreen.tsx

import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const HelpScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Help & FAQs</Text>
      <Text style={styles.question}>Q: How do I add a transaction?</Text>
      <Text style={styles.answer}>
        Tap the "+" icon in the center of the bottom navigation bar and fill in the details.
      </Text>

      <Text style={styles.question}>Q: Can I edit or delete transactions?</Text>
      <Text style={styles.answer}>
        Not yet — this feature is coming soon in future updates.
      </Text>

      <Text style={styles.question}>Q: Where can I view tips?</Text>
      <Text style={styles.answer}>
        Visit the Notifications section via the bell icon to view tips and suggestions.
      </Text>
    </ScrollView>
  );
};

export default HelpScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f3e8ff',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  question: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    color: '#222',
  },
  answer: {
    fontSize: 16,
    marginTop: 4,
    color: '#555',
  },
});
