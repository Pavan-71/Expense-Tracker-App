import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const PrivacyScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Icon name="shield-checkmark-outline" size={26} color="#8854d0" />
          <Text style={styles.title}>Privacy Policy</Text>
        </View>

        <Text style={styles.paragraph}>
          Your privacy is important to us. This app does not share your personal data with any third-party services, advertisers, or analytics platforms.
        </Text>

        <Text style={styles.paragraph}>
          We store only the necessary information such as your username, email, and financial transactions in order to provide a secure and personalized experience.
        </Text>

        <Text style={styles.paragraph}>
          Your financial data is encrypted and securely stored on our servers and locally on your device using industry-standard best practices.
        </Text>

        <Text style={styles.paragraph}>
          We do not access your phone contacts, gallery, location, or other private data. All permissions are explicitly requested and used only to enhance your experience.
        </Text>

        <Text style={styles.paragraph}>
          Future features like cloud sync or backup may store your data with trusted providers, but only with your explicit consent.
        </Text>

        <Text style={styles.paragraph}>
          By using this app, you agree to our privacy practices. This policy may be updated occasionally, so please review it periodically within the app.
        </Text>

        <Text style={styles.paragraph}>
          If you have any questions or concerns about how your data is handled, feel free to contact our support team via the Help section.
        </Text>
      </View>
    </ScrollView>
  );
};

export default PrivacyScreen;

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
    justifyContent: 'center',
    marginBottom: 20,
    gap: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  paragraph: {
    fontSize: 16,
    color: '#555',
    marginBottom: 12,
    lineHeight: 22,
  },
});
