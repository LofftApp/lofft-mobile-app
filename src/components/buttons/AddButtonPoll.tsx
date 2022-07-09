import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

// Assets 🖼
import color from '@Assets/lofftColorPallet.json';

// StyleSheets🖌
import {fontStyles} from '@StyleSheets/FontStyleSheet';

const AddButtonPoll = ({addInput}) => {
  return (
    <TouchableOpacity onPress={addInput}>
      <View style={styles.addPollContainer}>
        <Text style={[fontStyles.bodyLarge, styles.plusSign]}>&#43;</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  addPollContainer: {
    borderRadius: 8,
  },
  plusSign: {
    color: color.Lavendar[100],
    fontSize: 40,
  },
});

export default AddButtonPoll;
