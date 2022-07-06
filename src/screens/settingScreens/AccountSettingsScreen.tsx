import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TextInput, Platform} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

// FireStore 🔥
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// Components 🪢
import HeaderBar from '../../components/bannersAndBars/HeaderBar';
import {CoreButton} from '../../components/buttons/CoreButton';

// Style Sheets 🖌
import {CoreStyleSheet} from '../../StyleSheets/CoreDesignStyleSheet';
import {fontStyles} from '../../StyleSheets/FontStyleSheet';
import color from '../../assets/defaultColorPallet.json';

const AccountSettingsScreen = () => {
  const [pronoun, setPronoun] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otherPronoun, setOtherPronoun] = useState('');
  // const [visible, setVisible] = useState(false);

  const pronouns = ['he/him', 'she/her', 'they/them', 'other'];

  const handleChanges = async () => {
    // const update = {name, address, email, otherPronoun ? otherPronoun : pronoun};
    const uid = auth().currentUser?.uid;
    if (name) {
      try {
        await auth().currentUser?.updateProfile({displayName: name});
        firestore().collection('Users').doc(uid).update({displayName: name});
      } catch (error) {
        console.log(error);
      }
    }
    if (email) {
      try {
        auth().currentUser?.updateEmail(email);
        firestore().collection('Users').doc(uid).update({email: email});
      } catch (error) {
        console.log(error);
      }
    }
    if (pronoun) {
      try {
        firestore()
          .collection('Users')
          .doc(uid)
          .update({'userProfile.pronouns': pronoun});
      } catch (error) {
        console.log(error);
      }
    }
    setPassword('');
  };

  useEffect(() => {
    const user = auth().currentUser;
    console.log('page is loaded.');
    setName(user?.displayName);
    setEmail(user?.email);
    console.log(user?.email);
    console.log(user);
  }, []);
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
            />
          </View>
        ) : null}
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, styles.inputWidth]}
            onChangeText={value => setName(value)}
            value={name}
            placeholder="name"
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, styles.inputWidth]}
            onChangeText={value => setEmail(value)}
            value={email}
            placeholder="email"
            keyboardType="email-address"
          />
        </View>
        <View style={[styles.inputContainer, styles.inputContainerWithNote]}>
          <TextInput
            style={[styles.input, styles.inputWidth]}
            onChangeText={value => setPassword(value)}
            value={password}
            placeholder="password"
            autoCapitalize="none"
            secureTextEntry={true}
          />
          <Text style={styles.note}>
            Please enter your password to save changes
          </Text>
        </View>
        <CoreButton
          value="Save"
          style={styles.saveButton}
          onPress={() => handleChanges()}
          disabled={!(password.length > 5)}
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
  inputContainerWithNote: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  note: {
    marginBottom: 15,
    marginTop: 0,
    fontSize: 10,
    fontStyle: 'italic',
    color: color.Tomato[100],
  },
  saveButton: {
    marginTop: 10,
  },
});
export default AccountSettingsScreen;
