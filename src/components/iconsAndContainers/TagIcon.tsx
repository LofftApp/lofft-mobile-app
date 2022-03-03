import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';

// Stylesheets
import color from '../../assets/defaultColorPallet.json';
import {fontStyles} from '../../StyleSheets/FontStyleSheet';

const TagIcon = ({text, userColor}) => {
  let pillColor = '';
  let pillBackgroundColor = '';
  switch (userColor) {
    case 'Blue':
      pillColor = color.Blue[100];
      pillBackgroundColor = color.Blue[10];
      break;
    case 'Tomato':
      pillColor = color.Tomato[100];
      pillBackgroundColor = color.Tomato[10];
      break;
    case 'Gold':
      pillColor = color.Gold[100];
      pillBackgroundColor = color.Gold[10];
      break;
    case 'Mint':
      pillColor = color.Mint[100];
      pillBackgroundColor = color.Mint[10];
      break;
    default:
      pillColor = color.Lavendar[100];
      pillBackgroundColor = color.Lavendar[10];
      break;
  }
  return (
    <View
      style={[
        styles.pill,
        {borderColor: pillColor, backgroundColor: pillBackgroundColor},
      ]}>
      <Text style={[fontStyles.bodySmall, {color: pillColor}]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  pill: {
    width: 90,
    height: 25,
    borderWidth: 1,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
});

export default TagIcon;
