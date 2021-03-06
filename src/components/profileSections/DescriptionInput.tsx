import React from 'react';
import {StyleSheet} from 'react-native';

// Components 🪢
import EditableTextField from '@InputFields/EditableTextFields';

// Styles 🖌
import {fontStyles} from '@StyleSheets/FontStyleSheet';

// Assets 🖼
import * as color from '@Assets/lofftColorPallet.json';

const DescriptionInput = ({edit, value, newValue, onTextChange}) => {
  return (
    <EditableTextField
      placeholder="Description"
      edit={edit}
      value={value}
      newValue={newValue}
      fontStyle={fontStyles.bodySmall}
      multiline={true}
      onChangeText={onTextChange}
      inputFieldStyle={[styles.descriptionStyle, styles.descriptionStyleInput]}
      textStyle={[styles.descriptionStyle]}
    />
  );
};

const styles = StyleSheet.create({
  descriptionStyle: {
    marginBottom: 15,
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 5,
  },
  descriptionStyleInput: {
    borderWidth: 1,
    borderColor: color.Black[25],
    color: color.Black[100],
    width: '100%',
  },
});

export default DescriptionInput;
