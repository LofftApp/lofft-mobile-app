import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {fontStyles} from '@StyleSheets/FontStyleSheet';
import * as color from '@Assets/lofftColorPallet.json';

// Components
import CardType from '@Cards/CardType';

const ActiveCard = ({navigation, type}: any) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardTop}>
        <View style={styles.activeContainer}>
          <Text style={fontStyles.buttonTextSmall}>Active</Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('UserOptions')}>
          <View style={styles.editButton}>
            <Text style={[styles.pen, fontStyles.buttonTextMedium]}>
              &#9998;
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.cardBody}>
        <CardType type={type} />
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
  cardTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '95%',
    flexDirection: 'row',
  },
  cardBody: {
    marginHorizontal: 10,
    width: '90%',
  },
  activeContainer: {
    marginLeft: 10,
    paddingHorizontal: 8,
    paddingVertical: 7,
    backgroundColor: color.Mint[30],
    borderRadius: 8, // Not Working because
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButton: {
    backgroundColor: color.Lavendar[30],
    padding: 12,
    borderRadius: 50,
  },
  pen: {
    color: color.Lavendar[100],
  },
});

export default ActiveCard;
