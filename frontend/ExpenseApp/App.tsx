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
import ProfileScreen from './src/ProfileScreen';
import HelpScreen from './src/HelpScreen';
import TermsScreen from './src/TermsScreen';
import PrivacyScreen from './src/PrivacyScreen';
import SettingsScreen from './src/SettingsScreen';

import WelcomeScreen from './src/WelcomeScreen';
import LoginScreen from './src/LoginScreen';
import SignupScreen from './src/SignupScreen';

import { AuthProvider, AuthContext } from './src/context/AuthContext';
import ProtectedRoute from './src/ProtectedRoute';

import { Transaction } from './src/types';

export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Signup: undefined;
  Home: undefined;
  Overview: { transactions: Transaction[] };
  AddTransaction: undefined;
  AddForm: { type: 'income' | 'expense' };
  Notification: undefined;
  NotificationDetail: { id: string; title: string; content: string };
  Wallet: undefined;
  Logs: undefined;
  About: undefined;
  Profile: undefined;
  Help: undefined;
  Terms: undefined;
  Privacy: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const ProtectedHome = () => <ProtectedRoute><HomeScreen /></ProtectedRoute>;
const ProtectedOverview = () => <ProtectedRoute><OverviewScreen /></ProtectedRoute>;
const ProtectedAddTransaction = () => <ProtectedRoute><AddTransactionScreen /></ProtectedRoute>;
const ProtectedAddForm = () => <ProtectedRoute><AddFormScreen /></ProtectedRoute>;
const ProtectedNotification = () => <ProtectedRoute><NotificationScreen /></ProtectedRoute>;
const ProtectedNotificationDetail = () => <ProtectedRoute><NotificationDetailScreen /></ProtectedRoute>;
const ProtectedWallet = () => <ProtectedRoute><WalletScreen /></ProtectedRoute>;
const ProtectedLogs = () => <ProtectedRoute><LogsScreen /></ProtectedRoute>;
const ProtectedAbout = () => <ProtectedRoute><AboutScreen /></ProtectedRoute>;
const ProtectedProfile = () => <ProtectedRoute><ProfileScreen /></ProtectedRoute>;
const ProtectedHelp = () => <ProtectedRoute><HelpScreen /></ProtectedRoute>;
const ProtectedTerms = () => <ProtectedRoute><TermsScreen /></ProtectedRoute>;
const ProtectedPrivacy = () => <ProtectedRoute><PrivacyScreen /></ProtectedRoute>;
const ProtectedSettings = () => <ProtectedRoute><SettingsScreen /></ProtectedRoute>;

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AuthContext.Consumer>
          {({ user, loading }) =>
            loading ? null : (
              <Stack.Navigator initialRouteName={user ? 'Home' : 'Welcome'}>
              
                <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
                <Stack.Screen name="Signup" component={SignupScreen} options={{ title: 'Sign Up' }} />

                <Stack.Screen name="Home" component={ProtectedHome} options={{ headerShown: false }} />
                <Stack.Screen name="Overview" component={ProtectedOverview} options={{ title: 'Overview' }} />
                <Stack.Screen name="AddTransaction" component={ProtectedAddTransaction} options={{ title: 'Log Transactions' }} />
                <Stack.Screen name="AddForm" component={ProtectedAddForm} options={{ title: 'Add Details' }} />
                <Stack.Screen name="Notification" component={ProtectedNotification} options={{ title: 'Tips & Suggestions' }} />
                <Stack.Screen name="NotificationDetail" component={ProtectedNotificationDetail} options={{ title: 'Details' }} />
                <Stack.Screen name="Wallet" component={ProtectedWallet} options={{ title: 'Wallet' }} />
                <Stack.Screen name="Logs" component={ProtectedLogs} options={{ title: 'Transaction Logs' }} />
                <Stack.Screen name="About" component={ProtectedAbout} options={{ title: 'About App' }} />
                <Stack.Screen name="Profile" component={ProtectedProfile} options={{ title: 'Your Profile' }} />
                <Stack.Screen name="Help" component={ProtectedHelp} options={{ title: 'Help & FAQs' }} />
                <Stack.Screen name="Terms" component={ProtectedTerms} options={{ title: 'Terms & Conditions' }} />
                <Stack.Screen name="Privacy" component={ProtectedPrivacy} options={{ title: 'Privacy Policy' }} />
                <Stack.Screen name="Settings" component={ProtectedSettings} options={{ title: 'Settings' }} />
              </Stack.Navigator>
            )
          }
        </AuthContext.Consumer>
      </NavigationContainer>
    </AuthProvider>
  );
}
