import React from 'react';
import {Text, View, TextInput, StyleSheet} from 'react-native';

// Styles
import {fontStyles} from '../../StyleSheets/FontStyleSheet';
import color from '../../assets/defaultColorPallet.json';

const TextInputField = ({
  value,
  onChageText,
  inputHeader,
  multiline = false,
  placeholder = '',
}) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={[fontStyles.buttonTextSmall]}>{inputHeader}</Text>
      <TextInput
        style={[
          styles.inputStyle,
          fontStyles.bodyMedium,
          multiline ? styles.multiLine : null,
        ]}
        placeholder={placeholder}
        autoCapitalize="none"
        value={value}
        onChangeText={onChageText}
        multiline={multiline}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 5,
  },
  inputStyle: {
    backgroundColor: color.Lavendar[10],
    paddingVertical: 13,
    paddingHorizontal: 10,
    marginTop: 5,
    borderRadius: 4,
  },
  multiLine: {
    paddingTop: 13,
    minHeight: 75,
  },
});

export default TextInputField;
