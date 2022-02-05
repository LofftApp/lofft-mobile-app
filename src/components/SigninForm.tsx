import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import color from '../assets/defaultColorPallet.json';
import {fontStyles} from '../StyleSheets/FontStyleSheet';
import {CoreButton} from './CoreButton';
import {Context as AuthContext} from '../context/AuthContext';
import AlertBanner from '../components/AlertBanner';

const SigninForm = ({navigation, signupForm = false}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkbox, setCheckbox] = useState(false);
  const buttonValue = signupForm ? 'Sign up' : 'Sign in';

  // Showing error not sure why, the context works
  const {state, signup, signin} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainerStyle}>
        {state.errorMessage ? (
          <AlertBanner alertType="warning" message={state.errorMessage} />
        ) : null}
        <TextInput
          style={[styles.inputStyle, fontStyles.bodyMedium]}
          keyboardType="email-address"
          placeholder="Email"
          autoCapitalize="none"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          style={[styles.inputStyle, fontStyles.bodyMedium]}
          placeholder="Set up password"
          autoCapitalize="none"
          secureTextEntry={true}
          value={password}
          onChangeText={(text: string) => setPassword(text)}
        />
        <View style={styles.switchContainer}>
          <Text style={[fontStyles.bodySmall]}>
            {signupForm ? 'Already' : "Don't"} have an account?
          </Text>
          <TouchableOpacity
            style={styles.switchLink}
            onPress={() =>
              navigation.navigate(signupForm ? 'Signin' : 'Signup')
            }>
            <Text style={[fontStyles.bodySmall, styles.switchLinkText]}>
              {signupForm ? 'Sign in' : 'Sign up'}
            </Text>
          </TouchableOpacity>
        </View>
        {signupForm ? (
          <BouncyCheckbox
            text="I agree to the terms & conditions and Lofft's privacy policy"
            size={25}
            fillColor={color.Lavendar[100]}
            unfillColor={color.White[100]}
            onPress={() => setCheckbox(checkbox ? false : true)}
            textStyle={[fontStyles.bodyMedium, {textDecorationLine: 'none'}]}
            iconStyle={styles.boxStyle}
            style={{marginTop: 20}}
          />
        ) : null}
      </View>
      <View style={styles.buttonContainer}>
        {signupForm ? (
          <CoreButton
            value={buttonValue}
            onPress={() => signup({email, password})}
            style={styles.buttonStyle}
          />
        ) : (
          <CoreButton
            value={buttonValue}
            onPress={() => signin({email, password})}
            style={styles.buttonStyle}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 55,
  },
  inputContainerStyle: {
    marginTop: 15,
  },
  inputStyle: {
    height: 56,
    paddingHorizontal: 15,
    fontSize: 24,
    marginVertical: 5,
    backgroundColor: color.Lavendar[10],
    color: color.Black[80],
    borderRadius: 16,
  },
  boxStyle: {
    borderWidth: 3,
    borderRadius: 5,
    marginLeft: 10,
  },
  buttonContainer: {
    marginBottom: 5,
  },
  buttonStyle: {width: '100%', marginTop: 40},
  switchContainer: {
    flexDirection: 'row',
    margin: 5,
  },
  switchLink: {
    marginLeft: 10,
  },
  switchLinkText: {
    color: color.Lavendar[80],
  },
});

export default SigninForm;
