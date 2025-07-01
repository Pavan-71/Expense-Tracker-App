import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';

type DetailRouteProp = RouteProp<RootStackParamList, 'NotificationDetail'>;

export default function NotificationDetailScreen() {
  const route = useRoute<DetailRouteProp>();
  const { title, content } = route.params;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <LinearGradient colors={['#f3e8ff', '#e1cfff']} style={styles.header}>
        <Icon name="info" size={28} color="#6a1b9a" style={styles.icon} />
        <Text style={styles.title}>{title}</Text>
      </LinearGradient>

      <View style={styles.card}>
        <Text style={styles.content}>{content}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3e8ff',
  },
  header: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    backgroundColor: '#f3e8ff',
    elevation: 4,
  },
  icon: {
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    color: '#6a1b9a',
    fontFamily: 'Montserrat Bold Italic',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  content: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
    fontFamily: 'Montserrat',
  },
});
