/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {fontStyles} from '../StyleSheets/FontStyleSheet';
import color from '../assets/defaultColorPallet.json';

// Components
import CardType from './CardType';
import SingleCardType from './SingleCardType';

const ActiveCard = props => {


  return(
      <View style={styles.cardContainer}>
        <View style={styles.activeContainer}>
          <Text style={fontStyles.buttonTextSmall}>Active</Text>
        </View>
      <View style={styles.cardBody}>
        <CardType type={props.type}/>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 271,
    height: 153,
    backgroundColor: color.Lavendar[10],
    borderRadius: 16,
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    paddingVertical: 5,
    marginVertical: 35,
  },
  cardBody: {
    marginHorizontal: 10,
    width: '90%',
  },
  activeContainer: {
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: color.Mint[30],
    borderRadius: 8, // Not Working because
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ActiveCard;
