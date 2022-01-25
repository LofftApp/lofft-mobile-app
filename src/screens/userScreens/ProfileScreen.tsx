import React, {useState} from 'react';
import {View, Text, StyleSheet, Platform, TextInput} from 'react-native';

// Components
import CustomBackButton from '../../components/CustomBackButton';

// Stylesheets
import color from './../../assets/defaultColorPallet.json';
import {CoreStyleSheet} from '../../StyleSheets/CoreDesignStyleSheet';
import {fontStyles} from './../../StyleSheets/FontStyleSheet';
import {navigationRef} from '../../RootNavigation';
import {CoreButton} from '../../components/CoreButton';

const ProfileScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [pronouns, setPronouns] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  return (
    <View
      style={[
        CoreStyleSheet.viewContainerStyle,
        Platform.OS === 'ios' ? CoreStyleSheet.viewContainerIOSStyle : null,
      ]}>
      <CustomBackButton
        onPress={() => navigationRef.goBack()}
        title="My Profile"
      />
      <Text style={[fontStyles.bodyMedium, styles.introText]}>
        Use this page to update your account information or missing details
      </Text>
      <View style={styles.textInputContainer}>
        <Text style={fontStyles.buttonTextMedium}>First Name</Text>
        <TextInput
          style={[fontStyles.bodyMedium, styles.inputField]}
          value={firstName}
          onChangeText={text => setFirstName(text)}
          autoCorrect={false}
        />
      </View>
      <View style={styles.textInputContainer}>
        <Text style={fontStyles.buttonTextMedium}>Last Name</Text>
        <TextInput
          style={[fontStyles.bodyMedium, styles.inputField]}
          value={lastName}
          onChangeText={text => setLastName(text)}
          autoCorrect={false}
        />
      </View>
      <View style={styles.textInputContainer}>
        <Text style={fontStyles.buttonTextMedium}>Pronouns</Text>
        <TextInput
          style={[fontStyles.bodyMedium, styles.inputField]}
          value={pronouns}
          onChangeText={text => setPronouns(text)}
          autoCorrect={false}
        />
      </View>
      <View style={styles.textInputContainer}>
        <Text style={fontStyles.buttonTextMedium}>E-mail</Text>
        <TextInput
          style={[fontStyles.bodyMedium, styles.inputField]}
          value={email}
          onChangeText={text => setEmail(text)}
          autoCorrect={false}
          keyboardType="email-address"
        />
      </View>
      <View style={styles.textInputContainer}>
        <Text style={fontStyles.buttonTextMedium}>Password</Text>
        <TextInput
          style={[fontStyles.bodyMedium, styles.inputField]}
          value={password}
          onChangeText={text => setPassword(text)}
          autoCorrect={false}
          secureTextEntry={true}
        />
      </View>
      <View style={styles.textInputContainer}>
        <Text style={fontStyles.buttonTextMedium}>Repeat Password</Text>
        <TextInput
          style={[fontStyles.bodyMedium, styles.inputField]}
          value={repeatPassword}
          onChangeText={text => setRepeatPassword(text)}
          autoCorrect={false}
          secureTextEntry={true}
        />
      </View>
      <CoreButton value="Update Account" userStyle={styles.updateButton} />
    </View>
  );
};

const styles = StyleSheet.create({
  introText: {
    textAlign: 'justify',
    marginTop: 25,
  },
  textInputContainer: {
    marginTop: 15,
  },
  inputField: {
    backgroundColor: color.White[100],
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: color.Black[30],
  },
  updateButton: {
    marginTop: 25,
    backgroundColor: color.Mint[100],
    borderColor: color.Mint[100],
  },
});

export default ProfileScreen;
