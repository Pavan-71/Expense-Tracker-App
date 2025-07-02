import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  Animated,
  StyleSheet,
  SafeAreaView,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
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
  const slideAnim = useRef(new Animated.Value(-260)).current;
  const [visible, setVisible] = useState(false);

  const toggleSidebar = () => {
    Animated.timing(slideAnim, {
      toValue: visible ? -260 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
    setVisible(!visible);
  };

  const closeSidebar = () => {
    Animated.timing(slideAnim, {
      toValue: -260,
      duration: 250,
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

  const menuItems: { label: string; icon: string; screen: keyof RootStackParamList }[] = [
    { label: 'Profile', icon: 'person-outline', screen: 'Profile' },
    { label: 'Home', icon: 'home-outline', screen: 'Home' },
    { label: 'Dashboard', icon: 'bar-chart-outline', screen: 'Overview' },
    { label: 'Wallet', icon: 'card-outline', screen: 'Wallet' },
    { label: 'Logs', icon: 'document-text-outline', screen: 'Logs' },
    { label: 'Tips', icon: 'bulb-outline', screen: 'Notification' },
    { label: 'About', icon: 'information-circle-outline', screen: 'About' },
    { label: 'Settings', icon: 'settings-outline', screen: 'Settings' },
  ];

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.topBar}>
          <Pressable onPress={toggleSidebar}>
            <Ionicons name="menu" size={28} color="#555" />
          </Pressable>
          <Text style={styles.header}>Home</Text>
          <Pressable onPress={onNotificationPress}>
            <View>
              <Ionicons name="notifications-outline" size={24} color="#555" />
              {notificationDot && <View style={styles.redDot} />}
            </View>
          </Pressable>
        </View>
      </SafeAreaView>

      {visible && (
        <Pressable style={styles.overlay} onPress={closeSidebar} />
      )}

      <Animated.View style={[styles.sidebar, { left: slideAnim }]}>
        <Text style={styles.menuTitle}>Menu</Text>
        {menuItems.map((item) => (
          <Pressable
            key={item.screen}
            onPress={() => handleNavigate(item.screen)}
            android_ripple={{ color: '#d1b3ff' }}
            style={({ pressed }) => [
              styles.menuRow,
              pressed && styles.pressedRow,
            ]}
          >
            <Ionicons name={item.icon} size={22} color="#555" />
            <Text style={styles.menuItem}>{item.label}</Text>
          </Pressable>
        ))}
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
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  header: {
    fontSize: 20,
    color: '#555',
    fontWeight: 'bold',
    textTransform: 'capitalize',
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
    width: 260,
    backgroundColor: '#f3e8ff',
    zIndex: 10,
    padding: 20,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  pressedRow: {
    backgroundColor: '#e7dfff', // Soft background on press
  },
  menuItem: {
    fontSize: 16,
    marginLeft: 12,
    color: '#555',
  },
});
