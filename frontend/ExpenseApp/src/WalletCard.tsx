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
      colors={['#a18cd1', '#fbc2eb']}
      style={styles.card}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <TouchableOpacity style={styles.menuIcon} onPress={onMenuPress}>
        <EllipsisVertical color="#fff" size={20} />
      </TouchableOpacity>

      <Text style={styles.cardNumber}>{cardNumber}</Text>
      <Text style={styles.cardHolder}>{cardHolder}</Text>
      <Text style={styles.expiry}>Exp: {expiry}</Text>

      <View style={styles.balanceSection}>
        <Text style={styles.balanceLabel}>Total Balance</Text>
        <Text style={styles.balance}>₹{balance.toLocaleString()}</Text>
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
    position: 'relative',
    overflow: 'hidden',
  },
  menuIcon: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  cardNumber: {
    color: '#fff',
    fontSize: 18,
    letterSpacing: 2,
    marginTop: 20,
  },
  cardHolder: {
    color: '#fff',
    fontSize: 16,
    marginTop: 10,
  },
  expiry: {
    color: '#fff',
    fontSize: 14,
    marginTop: 5,
  },
  balanceSection: {
    marginTop: 30,
    alignItems: 'flex-start',
  },
  balanceLabel: {
    color: '#fff',
    fontSize: 14,
  },
  balance: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 4,
  },
  cardBrand: {
    position: 'absolute',
    bottom: 16,
    right: 20,
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    fontStyle: 'italic',
    opacity: 0.9,
  },
});

export default WalletCard;
