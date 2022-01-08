import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';
import color from '../assets/defaultColorPallet.json';
import {fontStyles} from '../StyleSheets/FontStyleSheet';

export const CoreButton = ({
  value,
  invert = false,
  userStyle,
  onPress,
}: any) => {
  return (
    <TouchableOpacity
      style={[
        styles.buttonStyle,
        invert ? styles.buttonInvert : null,
        userStyle,
      ]}
      onPress={onPress}>
      <Text
        style={[
          styles.buttonTextStyle,
          fontStyles.buttonTextMedium,
          invert ? styles.textInvertButton : null,
        ]}>
        {value}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.Lavendar[100],
    borderColor: color.Lavendar[100],
    borderRadius: 16,
    height: 53,
    borderWidth: 2,
  },
  buttonTextStyle: {
    color: color.White[100],
    fontSize: 22,
  },
  buttonInvert: {
    backgroundColor: color.White[100],
  },
  textInvertButton: {
    color: color.Lavendar[100],
  },
});
