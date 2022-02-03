import React, {useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fontStyles } from '../StyleSheets/FontStyleSheet';
import color from '../assets/defaultColorPallet.json';

const ActiveCard = props => {
  const [cards, setCards] = useState([props.userCards])

  return(
  <View style={styles.cardContainer}>
      <View style={styles.iconRoundal}>
      </View>
      <Text style={[fontStyles.buttonTextMedium, styles.cardText]}>
        Visa
      </Text>
  </View>
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

export default ActiveCard;
