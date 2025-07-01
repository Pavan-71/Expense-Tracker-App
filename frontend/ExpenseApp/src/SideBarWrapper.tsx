import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  SafeAreaView,
  Platform,
  Pressable,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { Transaction } from './types';

type SideBarWrapperProps = {
  children: React.ReactNode;
  notificationDot?: boolean;
  onNotificationPress?: () => void;
  transactions?: Transaction[];
};

const SidebarWrapper = ({
  children,
  notificationDot,
  onNotificationPress,
  transactions,
}: SideBarWrapperProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  const slideAnim = useRef(new Animated.Value(-250)).current;
  const [visible, setVisible] = useState(false);

  const toggleSidebar = () => {
    Animated.timing(slideAnim, {
      toValue: visible ? -250 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setVisible(!visible);
  };

  const closeSidebar = () => {
    Animated.timing(slideAnim, {
      toValue: -250,
      duration: 300,
      useNativeDriver: false,
    }).start(() => setVisible(false));
  };

  const handleNavigate = (screen: keyof RootStackParamList) => {
    if (screen === 'Overview') {
      navigation.navigate('Overview', { transactions: transactions || [] });
    } else {
      navigation.navigate(screen as any);
    }
    closeSidebar();
  };

  const currentRoute = route.name;

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={toggleSidebar}>
            <Ionicons name="menu" size={28} color="#555" />
          </TouchableOpacity>
          <Text style={styles.header}>{currentRoute}</Text>
          <TouchableOpacity onPress={onNotificationPress}>
            <View>
              <Ionicons name="notifications-outline" size={24} color="#555" />
              {notificationDot && <View style={styles.redDot} />}
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {visible && <Pressable style={styles.overlay} onPress={closeSidebar} />}

      <Animated.View style={[styles.sidebar, { left: slideAnim }]}>
        <TouchableOpacity onPress={() => handleNavigate('Profile')} style={styles.menuRow}>
          <Ionicons name="person-outline" size={22} color="#555" />
          <Text style={styles.menuItem}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigate('Home')} style={styles.menuRow}>
          <Ionicons name="home-outline" size={22} color="#555" />
          <Text style={styles.menuItem}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigate('Overview')} style={styles.menuRow}>
          <Ionicons name="bar-chart-outline" size={22} color="#555" />
          <Text style={styles.menuItem}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigate('Wallet')} style={styles.menuRow}>
          <Ionicons name="card-outline" size={22} color="#555" />
          <Text style={styles.menuItem}>Wallet</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigate('Logs')} style={styles.menuRow}>
          <Ionicons name="document-text-outline" size={22} color="#555" />
          <Text style={styles.menuItem}>Logs</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigate('Notification')} style={styles.menuRow}>
          <Ionicons name="bulb-outline" size={22} color="#555" />
          <Text style={styles.menuItem}>Tips</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigate('About')} style={styles.menuRow}>
          <Ionicons name="information-circle-outline" size={22} color="#555" />
          <Text style={styles.menuItem}>About</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigate('Settings')} style={styles.menuRow}>
          <Ionicons name="settings-outline" size={22} color="#555" />
          <Text style={styles.menuItem}>Settings</Text>
        </TouchableOpacity>
      </Animated.View>

      <View style={{ flex: 1 }}>{children}</View>
    </View>
  );
};

export default SidebarWrapper;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  topBar: {
    height: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 20,
    color: '#555',
    fontWeight: 'bold',
  },
  redDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
    position: 'absolute',
    top: -3,
    right: -3,
  },
  overlay: {
    position: 'absolute',
    top: 60 + (Platform.OS === 'android' ? 25 : 0),
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.2)',
    zIndex: 5,
  },
  sidebar: {
    position: 'absolute',
    top: 60 + (Platform.OS === 'android' ? 25 : 0),
    bottom: 0,
    width: 250,
    backgroundColor: '#f3e8ff',
    zIndex: 10,
    padding: 16,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  menuItem: {
    fontSize: 16,
    marginLeft: 12,
    color: '#555',
  },
});
