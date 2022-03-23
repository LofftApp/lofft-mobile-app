import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';
import color from '../../assets/defaultColorPallet.json';
import {fontStyles} from '../../StyleSheets/FontStyleSheet';

export const CoreButton = ({
  value,
  invert = false,
  style,
  onPress,
  disabled = false,
  newcolor,
}: any) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.buttonStyle, invert ? styles.buttonInvert : null, style]}
      onPress={onPress}>
      <Text
        style={[
          fontStyles.buttonTextMedium,
          styles.buttonTextStyle,
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
  },
  buttonInvert: {
    backgroundColor: color.White[100],
  },
  textInvertButton: {
    color: color.Lavendar[100],
  },
});
