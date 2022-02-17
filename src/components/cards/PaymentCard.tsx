import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {fontStyles} from '../../StyleSheets/FontStyleSheet';
import color from '../../assets/defaultColorPallet.json';
import Icon from 'react-native-vector-icons/Ionicons';

// The active Icon is used on cards but is conditional that the card is active.
const ActiveIcon = () => {
  return (
    <View style={styles.activeIcon}>
      <Text style={[fontStyles.buttonTextSmall, styles.activeIconText]}>
        Active
      </Text>
    </View>
  );
};

const PaymentCard = ({active = false}: any) => {
  return (
    <TouchableOpacity style={styles.cardContainer}>
      {active ? <ActiveIcon /> : null}
      <View style={styles.iconRoundal}>
        <Icon
          style={{marginLeft: 3}}
          name="add-outline"
          size={35}
          color={color.Lavendar[100]}
        />
      </View>
      <Text style={[fontStyles.buttonTextMedium, styles.cardText]}>
        Add new Payment method
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 271,
    height: 153,
    backgroundColor: color.Lavendar[100],
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 5,
    marginVertical: 35,
  },
  iconRoundal: {
    width: 48,
    height: 48,
    backgroundColor: color.White[100],
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
  },
  cardText: {
    color: color.White[100],
  },
  activeIcon: {
    width: 51,
    height: 30,
    alignSelf: 'flex-start',
    marginLeft: 20,
    backgroundColor: color.Mint[50],
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  activeIconText: {
    color: color.White[100],
  },
});

export default PaymentCard;
