import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const HelpScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Icon name="help-circle-outline" size={26} color="#8854d0" />
          <Text style={styles.title}>Help & FAQs</Text>
        </View>

        <View style={styles.qaBlock}>
          <Text style={styles.question}>Q: How do I add a transaction?</Text>
          <Text style={styles.answer}>
            Tap the "+" icon in the center of the bottom navigation bar and fill in the transaction details like amount, category, type, and date.
          </Text>
        </View>

        <View style={styles.qaBlock}>
          <Text style={styles.question}>Q: Can I edit or delete transactions?</Text>
          <Text style={styles.answer}>
            Edit/delete functionality will be introduced in an upcoming update. For now, focus on accurate input when adding transactions.
          </Text>
        </View>

        <View style={styles.qaBlock}>
          <Text style={styles.question}>Q: Where can I view financial tips?</Text>
          <Text style={styles.answer}>
            Tap the bell icon at the top right of the Home screen to access Tips & Suggestions. You'll find articles on saving, budgeting, and more.
          </Text>
        </View>

        <View style={styles.qaBlock}>
          <Text style={styles.question}>Q: Is my data stored securely?</Text>
          <Text style={styles.answer}>
            Yes. Your data is securely stored using MongoDB, and local sensitive info like auth tokens are managed via AsyncStorage.
          </Text>
        </View>

        <View style={styles.qaBlock}>
          <Text style={styles.question}>Q: I forgot my password. What do I do?</Text>
          <Text style={styles.answer}>
            Currently, password reset functionality is under development. If you’re logged in, consider updating your profile information.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default HelpScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3e8ff',
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'center',
    gap: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  qaBlock: {
    marginBottom: 16,
  },
  question: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
    marginBottom: 4,
  },
  answer: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
  },
});
