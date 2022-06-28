import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// Stylesheets
import color from '../../assets/defaultColorPallet.json';
import {fontStyles} from '../../StyleSheets/FontStyleSheet';

const TagIcon = ({ text, userColor, idTags = false, pickCity, id, activeColor }) => {
  let pillColor = '';
  let pillBackgroundColor = '';
  // let tags = true;
  switch (userColor) {
    case 'Black':
      pillColor = color.Black[100];
      pillBackgroundColor = color.Black[10];
      break;
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
    <TouchableOpacity onPress={() => pickCity(id)}>
    <View
      style={[
        styles.pill,
          { borderColor: pillColor, backgroundColor: activeColor },
      ]}>
      <Text style={[fontStyles.bodySmall, {color: pillColor}]}>{text}</Text>
      {idTags ? <Icon name="close-circle" size={20} color={pillColor} /> : null}
    </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pill: {
    padding: 2,
    height: 25,
    borderWidth: 1,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginHorizontal: 5,
  },
});

export default TagIcon;
