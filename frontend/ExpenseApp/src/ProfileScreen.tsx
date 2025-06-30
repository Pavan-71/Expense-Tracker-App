import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/profile-placeholder.png')} // add your own image or use a URL
        style={styles.avatar}
      />
      <Text style={styles.name}>Pavan Saketh</Text>
      <Text style={styles.email}>you@example.com</Text>
      <Text style={styles.sectionTitle}>App Preferences</Text>
      <Text style={styles.label}>• Dark mode toggle (in sidebar)</Text>
      <Text style={styles.label}>• Notification tips</Text>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3e8ff',
    alignItems: 'center',
    padding: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginTop: 20,
    marginBottom: 8,
    color: '#444',
  },
  label: {
    fontSize: 16,
    color: '#555',
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginVertical: 2,
  },
});
