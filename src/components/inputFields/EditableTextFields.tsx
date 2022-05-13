import React from 'react';
import {StyleSheet, Text, TextInput} from 'react-native';
import {black} from 'react-native-paper/lib/typescript/styles/colors';

// styleSheets
import color from '../../assets/defaultColorPallet.json';

const EditableTextField = ({
  edit = false,
  value,
  multiline = false,
  newValue = value,
  placeholder = '',
  fontStyle = null,
  textStyle = null,
  inputFieldStyle = null,
  onChangeText = null,
}) => {
  return (
    <>
      {edit ? (
        <TextInput
          value={newValue}
          multiline={multiline}
          style={[styles.editForm, fontStyle, inputFieldStyle]}
          placeholder={placeholder}
          onChangeText={onChangeText}
          placeholderTextColor={color.Black[25]}
        />
      ) : (
        <Text style={[fontStyle, textStyle]}>{value}</Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  editForm: {
    flexDirection: 'row',
    backgroundColor: color.White[50],
    color: color.Black[100],
    paddingHorizontal: 5,
    // Breaks on android when set to 0
    // lineHeight: 0,
    borderRadius: 4,
    minWidth: 100,
  },
});

export default EditableTextField;
