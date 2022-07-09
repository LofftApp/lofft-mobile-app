import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

// StyleSheets 🖌
import {fontStyles} from '@StyleSheets/FontStyleSheet';

// Assets 🖼
import visa from '@Assets/appImages/visa_logo.png';
import paypal from '@Assets/appImages/paypal_logo.png';
import applepay from '@Assets/appImages/apple_pay_logo.png';
import sepa from '@Assets/appImages/sepa_logo.png';
import googlepay from '@Assets/appImages/google_pay_logo.png';

const CardType = props => {
  let card: any = {};

  switch (props.type) {
    case 'Credit/debit card':
      card.type = 'Credit/debit card';
      card.info = '**** **** **** 002';
      card.image = visa;
      break;
    case 'Apple Pay':
      card.type = 'Apple Pay';
      card.info = 'james@lofft.app';
      card.image = applepay;
      break;
    case 'SEPA direct debit':
      card.type = 'Sepa';
      card.info = 'james@lofft.app';
      card.image = sepa;
      break;
    case 'Paypal':
      card.type = 'Paypal';
      card.info = 'james@lofft.app';
      card.image = paypal;
      break;
    case 'Google Pay':
      card.type = 'Google Pay';
      card.info = 'james@lofft.app';
      card.image = googlepay;
      break;
    default:
      break;
  }

  return (
    <View>
      <Image style={styles.cardImage} source={card.image} />
      <Text style={fontStyles.bodyMedium}>{card.info}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardImage: {
    width: 100,
    height: 64,
    resizeMode: 'contain',
  },
});

export default CardType;
