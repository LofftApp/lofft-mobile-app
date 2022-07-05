import React, {useState} from 'react';
import {Text, View, StyleSheet, TextInput, Platform} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

// Components
import HeaderBar from '../../components/bannersAndBars/HeaderBar';
import {CoreButton} from '../../components/buttons/CoreButton';
// Style Sheets
import {CoreStyleSheet} from '../../StyleSheets/CoreDesignStyleSheet';
import {fontStyles} from '../../StyleSheets/FontStyleSheet';
import color from '../../assets/defaultColorPallet.json';

const AccountSettingsScreen = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [pronoun, setPronoun] = useState('');
  const [otherPronoun, setOtherPronoun] = useState('');
  const [visible, setVisible] = useState(false);

  const pronouns = ['he/him', 'she/her', 'they/them', 'other'];
  const handleChanges = () => {
    console.log([name, address, email, otherPronoun ? otherPronoun : pronoun]);
    setName('');
    setAddress('');
    setEmail('');
    setPronoun('');
  };

  return (
    <View
      style={[
        CoreStyleSheet.viewContainerStyle,
        Platform.OS === 'ios' ? CoreStyleSheet.viewContainerIOSStyle : null,
      ]}>
      <HeaderBar title="My Settings" />
      <View>
        <View style={styles.inputContainer}>
          <SelectDropdown
            buttonStyle={styles.inputWidth}
            data={pronouns}
            defaultButtonText="Select pronouns"
            onSelect={selectedItem => {
              setPronoun(selectedItem);
            }}
          />
        </View>
        {pronoun === 'other' ? (
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, styles.inputWidth]}
              onChangeText={value => setOtherPronoun(value)}
              value={otherPronoun}
              placeholder="pronoun"
              keyboardType="numeric"
            />
          </View>
        ) : null}
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, styles.inputWidth]}
            onChangeText={value => setName(value)}
            value={name}
            placeholder="name"
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, styles.inputWidth]}
            onChangeText={value => setAddress(value)}
            value={address}
            placeholder="address"
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, styles.inputWidth]}
            onChangeText={value => setEmail(value)}
            value={email}
            placeholder="email"
            keyboardType="numeric"
          />
        </View>
        <CoreButton
          value="Save"
          style={styles.saveButton}
          onPress={() => handleChanges()}
        />
      </View>
    </View>
  );
};
// 1. create a submit button
// 2. click event on the submit button
// 3. collect changed personal data
const styles = StyleSheet.create({
  inputWidth: {
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: color.Black[25],
    color: color.Black[100],
    fontSize: 18,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    // width: 200,
    // flex: 0.5,
  },
  saveButton: {
    marginTop: 10,
  },
});
export default AccountSettingsScreen;
