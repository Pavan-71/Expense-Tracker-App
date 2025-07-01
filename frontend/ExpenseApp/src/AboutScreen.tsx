import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <Ionicons name="cash-outline" size={26} color="#6a1b9a" />
          <Text style={styles.title}>Expense Tracker</Text>
        </View>

        <Text style={styles.version}>Version 1.0.0</Text>
        <Text style={styles.developer}>Developed by Saketh</Text>

        <Text style={styles.description}>
          A simple yet powerful Expense Tracker built with React Native for frontend,
          and Node.js + Express for backend. Track your income and expenses,
          visualize summaries with charts, and manage your finances effortlessly.
        </Text>

        <View style={styles.headerRow}>
          <Ionicons name="rocket-outline" size={22} color="#6a1b9a" />
          <Text style={styles.sectionTitle}>Tech Stack</Text>
        </View>

        {[
          'React Native (Frontend)',
          'Node.js & Express (Backend APIs)',
          'MongoDB (Database)',
          'Victory / ChartKit (Data Visualization)',
          'AsyncStorage (Local Persistence)',
          'React Navigation (Routing)',
        ].map((item, index) => (
          <View key={index} style={styles.bulletItem}>
            <Ionicons
              name="checkmark-circle-outline"
              size={20}
              color="#6a1b9a"
              style={styles.bulletIcon}
            />
            <Text style={styles.bulletText}>{item}</Text>
          </View>
        ))}

        <Text style={styles.footer}>
          All features are optimized for speed, scalability, and smooth UX.
        </Text>
        <Text style={styles.footer}>© 2025 Expense Tracker. All rights reserved.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3e8ff',
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 8,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Montserrat Bold Italic',
    color: '#6a1b9a',
  },
  version: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 2,
    fontFamily: 'Montserrat',
  },
  developer: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 12,
    fontFamily: 'Montserrat',
  },
  description: {
    fontSize: 16,
    color: '#444',
    marginBottom: 20,
    fontFamily: 'Montserrat',
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6a1b9a',
    fontFamily: 'Montserrat',
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  bulletIcon: {
    marginRight: 8,
  },
  bulletText: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Montserrat',
  },
  footer: {
    fontSize: 14,
    color: '#777',
    marginTop: 16,
    fontFamily: 'Montserrat Italic',
    textAlign: 'center',
  },
});
