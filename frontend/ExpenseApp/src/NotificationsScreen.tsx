import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import notificationsData from './notifications.json';
import Icon from 'react-native-vector-icons/Feather';

type Notification = {
  id: string;
  title: string;
  content: string;
};

export default function NotificationsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    setNotifications(notificationsData);
  }, []);

  const handlePress = (note: Notification) => {
    navigation.navigate('NotificationDetail', {
      id: note.id,
      title: note.title,
      content: note.content,
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item)} style={styles.card}>
            <View style={styles.cardContent}>
              <Icon name="arrow-right-circle" size={20} color="#6a1b9a" style={styles.icon} />
              <Text style={styles.cardText}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3e8ff',
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  cardText: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Montserrat',
    flexShrink: 1,
  },
});
