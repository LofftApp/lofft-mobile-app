import React from 'react';
import {StyleSheet, Text, TextInput} from 'react-native';

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
    paddingHorizontal: 5,
    lineHeight: 0,
    borderRadius: 4,
  },
});

export default EditableTextField;
