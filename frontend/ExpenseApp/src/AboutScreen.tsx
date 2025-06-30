// 📄 src/AboutScreen.tsx

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Expense Tracker</Text>
      <Text style={styles.text}>Version: 1.0.0</Text>
      <Text style={styles.text}>Developed by: Saketh</Text>

      <Text style={styles.text}>A simple and efficient React Native Expense Tracker app with a Node.js + Express backend and MongoDB database.
 Track your daily income and expenses, view summary pie charts, and manage your financial transactions with ease.</Text>

      <Text style={styles.sectionTitle}>Tech Stack</Text>
      <Text style={styles.bullet}>• React Native (Frontend)</Text>
      <Text style={styles.bullet}>• Node.js & Express (Backend APIs)</Text>
      <Text style={styles.bullet}>• MongoDB (Database)</Text>
      <Text style={styles.bullet}>• Victory / ChartKit (Data Visualization)</Text>
      <Text style={styles.bullet}>• AsyncStorage (Local Persistence)</Text>
      <Text style={styles.bullet}>• React Navigation (Routing)</Text>

      <Text style={styles.text}>All features are optimized for performance, scalability, and user experience.</Text>
      <Text style={styles.text}>© 2025 Expense Tracker. All rights reserved.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f3e8ff', // 💜 Light purplish-white
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 8,
    color: '#444',
  },
  text: {
    fontSize: 16,
    marginVertical: 6,
    color: '#555',
  },
  bullet: {
    fontSize: 16,
    marginLeft: 10,
    color: '#555',
  },
});
