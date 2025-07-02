import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { EllipsisVertical } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';

interface WalletCardProps {
  cardNumber: string;
  cardHolder: string;
  expiry: string;
  balance: number;
  onMenuPress?: () => void;
  brand?: 'Visa' | 'MasterCard';
}

const WalletCard: React.FC<WalletCardProps> = ({
  cardNumber,
  cardHolder,
  expiry,
  balance,
  onMenuPress,
  brand = 'Visa',
}) => {
  return (
    <LinearGradient
      colors={['#8854d0', '#d8b4fe']}
      style={styles.card}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <TouchableOpacity style={styles.menuIcon} onPress={onMenuPress}>
        <EllipsisVertical color="#fff" size={20} />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.cardNumber}>{cardNumber}</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Card Holder</Text>
          <Text style={styles.value}>{cardHolder}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Expiry</Text>
          <Text style={styles.value}>{expiry}</Text>
        </View>

        <View style={styles.balanceSection}>
          <Text style={styles.balanceLabel}>Available Balance</Text>
          <Text style={styles.balance}>₹{balance.toLocaleString()}</Text>
        </View>
      </View>

      <Text style={styles.cardBrand}>{brand}</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderRadius: 20,
    padding: 20,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#8854d0',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  menuIcon: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 4,
    zIndex: 10,
  },
  content: {
    marginTop: 10,
  },
  cardNumber: {
    color: '#fff',
    fontSize: 18,
    letterSpacing: 2,
    marginBottom: 12,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  label: {
    color: '#ddd',
    fontSize: 14,
  },
  value: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
  },
  balanceSection: {
    marginTop: 20,
  },
  balanceLabel: {
    color: '#eee',
    fontSize: 14,
  },
  balance: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 4,
  },
  cardBrand: {
    position: 'absolute',
    bottom: 16,
    right: 20,
    color: '#ffffffcc',
    fontSize: 16,
    fontWeight: '600',
    fontStyle: 'italic',
  },
});

export default WalletCard;
