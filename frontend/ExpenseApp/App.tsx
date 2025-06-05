import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/HomeScreen';
import PieChartScreen from './src/PieChartScreen';
import { Transaction } from './src/types'; 
export type RootStackParamList = {
  Home: undefined;
  PieChart: { transactions: Transaction[] }; 
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Transactions' }} />
        <Stack.Screen name="PieChart" component={PieChartScreen} options={{ title: 'Monthly Summary Chart' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
