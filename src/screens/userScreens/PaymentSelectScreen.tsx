/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
// React Config
import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import {getUser } from '../../api/firebase/fireStoreActions';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
// Custom Config
import color from './../../assets/defaultColorPallet.json';
import CustomBackButton from '../../components/CustomBackButton';

// Components
import PaymentOption from '../../components/PaymentOption';
import { CoreButton } from '../../components/CoreButton';
// Current User


const PaymentSelect = ({navigation}: any) => {
  const paymentTypes = [
    {cardId: 1, type: 'Credit/debit card', checked: false, token:''},
    {cardId: 2, type: 'Paypal', checked: false, token:''},
    {cardId: 3, type: 'Apple Pay', checked: false, token: ''},
    {cardId: 4, type: 'SEPA direct debit', checked: false, token: ''},
  ];
  const [cards, setCards] = useState(paymentTypes);

  const toggleRightCard = (id: any) => {

    const randomTokenMakerSim = () => {
      const randomTokenSim = [];
      for (let i = 0; i < 16; i++) {
        randomTokenSim.push((Math.floor(Math.random() * 9) + 1).toString());
      }
      return randomTokenSim.join('');
    }

    const selectedCards = cards.map((el: any) => {
      if (el.cardId === id) {
        return { ...el, checked: !el.checked, token: randomTokenMakerSim()};
      } else {
        return el;
      }
    });

    setCards(selectedCards);

  };

// DB storage
  const storeCards = async () => {
    try {
    const user: any = await auth().currentUser;
        firestore()
          .collection('users')
          .doc(user.uid)
          .update({
            uid: user.uid,
            cards: cards
          })
        }
        catch(error){
          console.log("Sth went wront with storing card data")
        }
}




  return(
    <View style={styles.screenContainer}>
      <CustomBackButton onPress={() => navigation.goBack()} title="Add Payment Method" />
      <View style={styles.paymentSelectContainer}>
        {cards.map((el, index) => <PaymentOption key={index + 1} type={el.type} cardId={el.cardId} checked={el.checked} toggleRightCard={toggleRightCard}/>)}
      </View>
      <View>
        <CoreButton
          value="Confirm Selection"
          style={styles.button}
          onPress={() => storeCards()}
        />
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
  },
  button:{
    marginVertical: 240
  }
});

export default PaymentSelect;
