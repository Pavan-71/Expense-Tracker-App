import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { AuthContext } from './context/AuthContext';

const ProfileScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { user, logout } = useContext(AuthContext);

  const accountType = user?.isAdmin ? 'ADMIN' : 'USER';

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: logout },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileCard}>
        <Image
          source={require('../assets/profile-placeholder.png')}
          style={styles.avatar}
        />
        <Text style={styles.name}>{user?.username}</Text>
        <Text style={styles.email}>{user?.email}</Text>
        <Text style={styles.info}>
          <Ionicons name="call-outline" size={14} /> {user?.phone || 'Phone not added'}
        </Text>
        <Text style={styles.accountBadge}>
          <Ionicons
            name={accountType === 'ADMIN' ? 'shield-checkmark-outline' : 'person-circle-outline'}
            size={14}
          />{' '}
          {accountType === 'ADMIN' ? 'Admin Account' : 'User Account'}
        </Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.optionsWrapper}>
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Terms')}>
          <Ionicons name="document-text-outline" size={18} color="#4a148c" />
          <Text style={styles.optionText}>Terms & Conditions</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Help')}>
          <Ionicons name="help-circle-outline" size={18} color="#4a148c" />
          <Text style={styles.optionText}>Help & FAQs</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Privacy')}>
          <Ionicons name="lock-closed-outline" size={18} color="#4a148c" />
          <Text style={styles.optionText}>Privacy Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Settings')}>
          <Ionicons name="settings-outline" size={18} color="#4a148c" />
          <Text style={styles.optionText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.option, styles.logoutButton]}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={18} color="#b91c1c" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3e8ff',
    alignItems: 'center',
    padding: 24,
    paddingBottom: 100,
  },
  profileCard: {
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    width: '100%',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 12,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4a148c',
  },
  email: {
    fontSize: 16,
    color: '#555',
    marginTop: 4,
  },
  info: {
    fontSize: 15,
    color: '#666',
    marginTop: 2,
  },
  accountBadge: {
    marginTop: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: '#ede7f6',
    borderRadius: 12,
    fontSize: 13,
    color: '#6a1b9a',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 20,
  },
  optionsWrapper: {
    width: '100%',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginBottom: 12,
    elevation: 2,
    gap: 10,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#fee2e2',
  },
  logoutText: {
    fontSize: 16,
    color: '#b91c1c',
  },
});
