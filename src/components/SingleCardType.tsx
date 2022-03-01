/* eslint-disable prettier/prettier */
import React, {useEffect, useState}from "react";
import { View, Text, StyleSheet, Image } from 'react-native';
import { fontStyles } from '../StyleSheets/FontStyleSheet';
import color from '../assets/defaultColorPallet.json';
import visa from '../../assets/appImages/visa_logo.png';
import paypal from '../../assets/appImages/paypal_logo.png';
import applepay from '../../assets/appImages/apple_pay_logo.png';
import sepa from '../../assets/appImages/sepa_logo.png';
import googlepay from '../../assets/appImages/google_pay_logo.png'

const SingleCardType = (props) => {

let card: any = {};

  switch (props.type) {
  case "Paypal":
      card.type = "Paypal"
      card.info = "james@lofft.app"
      card.image = paypal
    break;

  default:
    break;
}

//   console.log(props.userCards)

//  props.userCards.map((el) => {

//   switch (el.type) {
//       case "Credit/debit card":
//         card.type = "Credit/debit card"
//         card.info = "**** **** **** 002"
//         card.image = visa
//         break;
//       case "Apple Pay":
//         card.type = "Apple Pay"
//         card.info = "james@lofft.app"
//         card.image = applepay
//         break;
//       case "SEPA direct debit":
//         card.type = "Sepa"
//         card.info = "james@lofft.app"
//         card.image = sepa
//       break;
//       case "Paypal":
//         card.type = "Paypal"
//         card.info = "james@lofft.app"
//         card.image = paypal
//         break;
//       case "Google Pay":
//         card.type = "Google Pay"
//         card.info = "james@lofft.app"
//         card.image = googlepay
//         break;
//       default:
//         break;
//     }

//  })


  return(
    <View>

      {/* <Image style={styles.cardImage} source={card.image} />
      <Text style={fontStyles.buttonTextMedium}>{card.info}</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  cardImage:{
    width: 100,
    height: 64,
    resizeMode: 'contain',
  }
});

export default SingleCardType;
