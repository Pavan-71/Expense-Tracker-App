import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  SafeAreaView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type SideBarWrapperProps = {
  children: React.ReactNode;
  notificationDot?: boolean;
  onNotificationPress?: () => void;
};

const SidebarWrapper = ({
  children,
  notificationDot,
  onNotificationPress,
}: SideBarWrapperProps) => {
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

  return (
    <View style={{ flex: 1 }}>
      {/* ✅ Safe Top Bar */}
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={toggleSidebar}>
            <Text style={styles.hamburger}>☰</Text>
          </TouchableOpacity>
          <Text style={styles.header}>Home</Text>
          <TouchableOpacity onPress={onNotificationPress}>
            <View>
              <Icon name="notifications-outline" size={24} color="#555" />
              {notificationDot && <View style={styles.redDot} />}
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Slide-in Sidebar */}
      <Animated.View style={[styles.sidebar, { left: slideAnim }]}>
        <Text style={styles.menuItem}>🏠 Home</Text>
        <Text style={styles.menuItem}>💰 Wallet</Text>
        <Text style={styles.menuItem}>📄 Logs</Text>
        <Text style={styles.menuItem}>💡 Tips</Text>
        <Text style={styles.menuItem}>🌙 Dark Mode</Text>
      </Animated.View>

      {/* Screen Content */}
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
  hamburger: {
    fontSize: 24,
    color: '#555',
    marginRight: 16,
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
  sidebar: {
    position: 'absolute',
    top: 60 + (Platform.OS === 'android' ? 25 : 0),
    bottom: 0,
    width: 250,
    backgroundColor: '#f3e8ff',
    zIndex: 10,
    padding: 16,
  },
  menuItem: {
    color: '#555',
    fontSize: 18,
    marginVertical: 12,
  },
});
