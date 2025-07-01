import React from 'react';
import { ScrollView, Text, StyleSheet, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TermsScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Ionicons name="document-text-outline" size={26} color="#4a148c" />
          <Text style={styles.title}>Terms & Conditions</Text>
        </View>

        <Text style={styles.paragraph}>
          Welcome to Expense Tracker. By accessing or using this app, you agree to be bound by these terms and conditions. If you do not agree with any part of the terms, please do not use the app.
        </Text>

        <Text style={styles.paragraph}>
          You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account. You agree to immediately notify us of any unauthorized use of your account or any other breach of security.
        </Text>

        <Text style={styles.paragraph}>
          The app is provided on an "as is" and "as available" basis. We make no warranties, either expressed or implied, and hereby disclaim and negate all other warranties, including without limitation implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.
        </Text>

        <Text style={styles.paragraph}>
          You must not misuse our services by interfering with their normal operation or attempting to access them using a method other than through the interfaces and instructions that we provide. Use of the app for illegal or unauthorized purposes is strictly prohibited.
        </Text>

        <Text style={styles.paragraph}>
          We reserve the right to modify or terminate the service for any reason, without notice at any time. We also reserve the right to alter these terms and conditions at any time. Continued use of the service after any changes constitutes your acceptance of the new terms.
        </Text>

        <Text style={styles.paragraph}>
          All content, trademarks, and data on this application, including but not limited to software, databases, text, graphics, icons, hyperlinks, private information, and designs are the property of or licensed to Expense Tracker and are protected from infringement by local and international legislation.
        </Text>

        <Text style={styles.paragraph}>
          Any disputes related to these terms and your use of the app shall be governed by the laws of your local jurisdiction, without regard to its conflict of law provisions.
        </Text>

        <Text style={styles.paragraph}>
          By continuing to use this app, you acknowledge that you have read, understood, and agreed to the above terms and conditions in full. We appreciate your trust in our service and look forward to helping you manage your finances efficiently and securely.
        </Text>
      </View>
    </ScrollView>
  );
};

export default TermsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f3e8ff',
    flexGrow: 1,
    alignItems: 'center',
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
    justifyContent: 'center',
    gap: 10,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  paragraph: {
    fontSize: 16,
    color: '#555',
    marginBottom: 14,
    lineHeight: 24,
  },
});
