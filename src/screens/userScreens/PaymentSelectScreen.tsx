/* eslint-disable prettier/prettier */
// React Config
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

// Custom Config
import color from './../../assets/defaultColorPallet.json';
import CustomBackButton from '../../components/CustomBackButton';

// Components
import PaymentOption from '../../components/PaymentOption';

const PaymentSelect = ({navigation}: any) => {
  const paymentTypes = [
    {cardId: 1, type: 'Credit/debit card', checked: false},
    {cardId: 2, type: 'Paypal', checked: false},
    {cardId: 3, type: 'Apple Pay', checked: false},
    {cardId: 4, type: 'SEPA direct debit', checked: false},
  ];
  const [cards, setCards] = useState(paymentTypes);

  const toggleRightCard = (id: any) => {
    const selectedCards = cards.map((el: any) => {
      if (el.cardId === id) {
        return {...el, checked: !el.checked};
      } else {
        return el;
      }
    })

    setCards(selectedCards);

  };



  return(
    <View style={styles.screenContainer}>
      <CustomBackButton onPress={() => navigation.goBack()} title="Add Payment Method" />
      <View style={styles.paymentSelectContainer}>
        {cards.map((el, index) => <PaymentOption key={index + 1} type={el.type} cardId={el.cardId} checked={el.checked} toggleRightCard={toggleRightCard}/>)}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screenContainer:{
    paddingVertical: 50,
    paddingHorizontal: 15,
    backgroundColor: color.White[100],
    flex: 1,
  },
  paymentSelectContainer:{
    marginTop:40
  }
});

export default PaymentSelect;
