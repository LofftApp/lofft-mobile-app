import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import color from '../../assets/defaultColorPallet.json';
import {fontStyles} from '../../StyleSheets/FontStyleSheet';
import {CoreButton} from './../buttons/CoreButton';
import {Context as UserDetails} from '../../context/UserDetailsContext';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';

const SigninForm = ({navigation, signupForm = false}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [checkbox, setCheckbox] = useState(false);
  const buttonValue = signupForm ? 'Sign up' : 'Sign in';
  const {state, signin, signup, uploadUserImage, photoUserImage} =
    useContext(UserDetails);
  const [modalVisible, setModalVisible] = useState(false);
  const [userImage, setUserImage] = useState('');

  const registrationValidation = () => {
    const passwordMatch = password === repeatPassword;
    const emailRegex = new RegExp(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i,
    );
    const emailCheck = emailRegex.test(email);
    return !(passwordMatch && checkbox && emailCheck);
  };

  return (
    <View style={styles.container}>
      <View>
        {state.errorMessage ? (
          <View style={styles.stateContainer}>
            <Text style={styles.stateText}>{state.errorMessage}</Text>
          </View>
        ) : null}
        {signupForm ? (
          <View style={styles.imageContainer}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              {userImage ? (
                <FastImage
                  source={{uri: userImage}}
                  style={styles.userImage}
                  resizeMode={FastImage.resizeMode.cover}
                />
              ) : (
                <View style={[styles.userImage, styles.noImageIcon]}>
                  <Icon
                    name="person-outline"
                    size={45}
                    color={color.Lavendar[80]}
                  />
                </View>
              )}
            </TouchableOpacity>
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
            placeholder="Password"
            autoCapitalize="none"
            secureTextEntry={true}
            value={password}
            placeholderTextColor={color.Black[30]}
            onChangeText={(text: string) => setPassword(text)}
          />
          {signupForm ? (
            <TextInput
              style={[styles.inputStyle, fontStyles.bodyMedium]}
              placeholder="Repeat Password"
              autoCapitalize="none"
              secureTextEntry={true}
              value={repeatPassword}
              placeholderTextColor={color.Black[30]}
              onChangeText={(text: string) => setRepeatPassword(text)}
            />
          ) : null}
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
              text="I agree to the terms & conditions, and Lofft's privacy policy"
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
            disabled={registrationValidation()}
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
      <Modal transparent={true} animationType="fade" visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <View>
              <CoreButton
                value="Upload Image"
                style={[styles.modalButton]}
                onPress={() => {
                  // const imageURI = await userImageUpload();
                  uploadUserImage();
                  setUserImage('updated');
                  setModalVisible(false);
                }}
              />
              <CoreButton
                value="Take Photo"
                style={[styles.modalButton]}
                invert
                onPress={async () => {
                  // const imageURI = await userTakePhoto();
                  await photoUserImage();
                  setUserImage('updated');
                  setModalVisible(false);
                }}
              />
            </View>
            <CoreButton
              value="Cancel"
              style={[styles.modalButton, styles.modalCancelButton]}
              onPress={() => {
                setModalVisible(false);
              }}
            />
          </View>
        </View>
      </Modal>
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
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  userImage: {
    width: 78,
    height: 78,
    borderWidth: 4,
    borderColor: color.Lavendar[100],
    backgroundColor: color.Lavendar[10],
    borderRadius: 75,
  },
  noImageIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Modal
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: color.Black[10],
  },
  modal: {
    justifyContent: 'space-around',
    height: '30%',
    backgroundColor: color.White[100],
    paddingVertical: 15,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    // shadowColor: color.Black[25],
    // shadowOpacity: 1,
    // shadowOffset: {width: 0, height: -2},
  },
  modalButton: {
    alignSelf: 'center',
    marginVertical: 5,
    width: '80%',
    height: 45,
  },
  modalCancelButton: {
    backgroundColor: color.Black[30],
    borderWidth: 0,
  },
});

export default SigninForm;
