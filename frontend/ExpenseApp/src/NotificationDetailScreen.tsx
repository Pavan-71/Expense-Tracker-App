// 📄 File: src/NotificationDetailScreen.tsx

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../App';

// Define route type for navigation
type DetailRouteProp = RouteProp<RootStackParamList, 'NotificationDetail'>;

export default function NotificationDetailScreen() {
  const route = useRoute<DetailRouteProp>();
  const { title, content } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{content}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  content: {
    fontSize: 16,
    color: '#444',
    lineHeight: 22,
  },
});
