import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import color from '../../assets/defaultColorPallet.json';
import {fontStyles} from '../../StyleSheets/FontStyleSheet';
import {CoreButton} from './../buttons/CoreButton';
import {Context as UserDetails} from '../../context/UserDetailsContext';
// import {signup, signin} from '../../api/firebase/firebaseApi';

const SigninForm = ({navigation, signupForm = false}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkbox, setCheckbox] = useState(false);
  const buttonValue = signupForm ? 'Sign up' : 'Sign in';
  const {state, signin, signup} = useContext(UserDetails);

  return (
    <View style={styles.container}>
      <View>
        {state.errorMessage ? (
          <View style={styles.stateContainer}>
            <Text style={styles.stateText}>{state.errorMessage}</Text>
          </View>
        ) : null}
        <View style={styles.inputContainerStyle}>
          <TextInput
            style={[styles.inputStyle, fontStyles.bodyMedium]}
            keyboardType="email-address"
            placeholder="Email"
            autoCapitalize="none"
            value={email}
            placeholderTextColor={color.Black[30]}
            onChangeText={text => setEmail(text)}
          />
          <TextInput
            style={[styles.inputStyle, fontStyles.bodyMedium]}
            placeholder="Set up password"
            autoCapitalize="none"
            secureTextEntry={true}
            value={password}
            placeholderTextColor={color.Black[30]}
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
    paddingBottom: 20,
  },
  stateContainer: {
    backgroundColor: color.Tomato[100],
    height: 35,
    borderRadius: 4,
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  stateText: {
    color: color.White[100],
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
    borderRadius: 8,
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
