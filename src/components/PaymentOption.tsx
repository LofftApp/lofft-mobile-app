/* eslint-disable prettier/prettier */
// React Config
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {RadioButton} from 'react-native-paper';

// Custom Config
import color from '../assets/lofftColorPallet.json';
import {fontStyles} from '../StyleSheets/FontStyleSheet';

const PaymentOption = ({cardId, type, checked, toggleRightCard}: any) => {
  return (
    <View style={styles.paymentPill}>
      <RadioButton
        value="first"
        status={checked ? 'checked' : 'unchecked'}
        color="blue"
        uncheckedColor="red"
        onPress={() => toggleRightCard(cardId)}
      />

      <Text style={[fontStyles.buttonTextMedium, styles.cardFont]}>{type}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  paymentPill: {
    padding: 20,
    marginTop: 16,
    borderRadius: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: color.Lavendar[30],
  },
  cardFont: {
    marginLeft: 5,
  },
});

export default PaymentOption;
