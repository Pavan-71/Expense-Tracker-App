// 📄 File: App.tsx

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/HomeScreen';
import OverviewScreen from './src/OverviewScreen';
import AddTransactionScreen from './src/AddTransactionScreen';
import AddFormScreen from './src/AddFormScreen';
import NotificationScreen from './src/NotificationsScreen';
import NotificationDetailScreen from './src/NotificationDetailScreen';
import WalletScreen from './src/WalletScreen';
import LogsScreen from './src/LogsScreen';
import AboutScreen from './src/AboutScreen';

// ✅ Newly added screens
import ProfileScreen from './src/ProfileScreen';
import HelpScreen from './src/HelpScreen';
import TermsScreen from './src/TermsScreen';
import PrivacyScreen from './src/PrivacyScreen';

import { Transaction } from './src/types';
export type RootStackParamList = {
  Home: undefined;
  Overview: { transactions: Transaction[] };
  AddTransaction: undefined;
  AddForm: { type: 'income' | 'expense' };
  Notification: undefined;
  NotificationDetail: {
    id: string;
    title: string;
    content: string;
  };
  Wallet: undefined;
  Logs: undefined;
  About: undefined;
  Profile: undefined; // ✅ Added
  Help: undefined; // ✅ Added
  Terms: undefined; // ✅ Added
  Privacy: undefined; // ✅ Added
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Overview" component={OverviewScreen} options={{ title: 'Overview' }} />
        <Stack.Screen name="AddTransaction" component={AddTransactionScreen} options={{ title: 'Log Transactions' }} />
        <Stack.Screen name="AddForm" component={AddFormScreen} options={{ title: 'Add Details' }} />
        <Stack.Screen name="Notification" component={NotificationScreen} options={{ title: 'Tips & Suggestions' }} />
        <Stack.Screen name="NotificationDetail" component={NotificationDetailScreen} options={{ title: 'Details' }} />
        <Stack.Screen name="Wallet" component={WalletScreen} options={{ title: 'Wallet' }} />
        <Stack.Screen name="Logs" component={LogsScreen} options={{ title: 'Transaction Logs' }} />
        <Stack.Screen name="About" component={AboutScreen} options={{ title: 'About App' }} />

        {/* ✅ Newly added */}
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Your Profile' }} />
        <Stack.Screen name="Help" component={HelpScreen} options={{ title: 'Help & FAQs' }} />
        <Stack.Screen name="Terms" component={TermsScreen} options={{ title: 'Terms & Conditions' }} />
        <Stack.Screen name="Privacy" component={PrivacyScreen} options={{ title: 'Privacy Policy' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
