import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Platform} from 'react-native';
import {navigationRef as navigation} from '../../RootNavigation';

// StyleSheets
import color from '../../assets/defaultColorPallet.json';
import {CoreStyleSheet} from '../../StyleSheets/CoreDesignStyleSheet';
import {fontStyles} from '../../StyleSheets/FontStyleSheet';

// Componenets
import CustomBackButton from '../../components/CustomBackButton';
import {CoreButton} from '../../components/CoreButton';

const JoinApartmentScreen = () => {
  const [formInput, setFormInput] = useState('');
  return (
    <View
      style={[
        CoreStyleSheet.viewContainerStyle,
        Platform.OS === 'ios' ? CoreStyleSheet.viewContainerIOSStyle : null,
      ]}>
      <CustomBackButton
        onPress={() => navigation.goBack()}
        title="Join a Lofft"
      />
      <View style={styles.pageContainer}>
        <Text style={fontStyles.bodyMedium}>
          To join a Lofft, please enter the Loffts name of unique code below
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.formField, fontStyles.bodyMedium]}
            placeholder="Name / Lofft ID"
            autoCapitalize="none"
            value={formInput}
            onChangeText={e => setFormInput(e)}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    paddingVertical: 15,
    marginVertical: 20,
  },
  inputContainer: {
    backgroundColor: color.Lavendar[30],
    height: 100,
    borderRadius: 12,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  formField: {
    height: 40,
    width: '100%',
    backgroundColor: color.White[80],
    borderRadius: 12,
    paddingHorizontal: 15,
  },
});

export default JoinApartmentScreen;
