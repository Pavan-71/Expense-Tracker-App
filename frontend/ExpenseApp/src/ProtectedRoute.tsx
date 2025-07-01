import React, { useContext, useEffect, ReactNode } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { AuthContext } from './context/AuthContext';
import { RootStackParamList } from '../App';

type NavProp = NativeStackNavigationProp<RootStackParamList>;

type ProtectedRouteProps = {
  children: ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useContext(AuthContext);
  const navigation = useNavigation<NavProp>();

  useEffect(() => {
    if (!loading && !user) {
      navigation.replace('Welcome');
    }
  }, [loading, user]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#6a1b9a" />
      </View>
    );
  }

  return user ? <>{children}</> : null;
}
