import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  TextInput,
} from 'react-native';

// Firebase
import {
  getCurrentUserDetails,
  updateUserAccountDetails,
} from '../../api/firebase/fireStoreActions';
import {userImageUpload} from '../../api/firebase/firebaseStorage';

// Components
import CustomBackButton from '../../components/CustomBackButton';
import UserIcon from '../../components/UserIcon';

// Stylesheets
import color from './../../assets/defaultColorPallet.json';
import {CoreStyleSheet} from '../../StyleSheets/CoreDesignStyleSheet';
import {fontStyles} from './../../StyleSheets/FontStyleSheet';
import {navigationRef} from '../../RootNavigation';
import {CoreButton} from '../../components/CoreButton';

const ProfileScreen = () => {
  useEffect(() => {
    const getUser = async () => {
      const result = await getCurrentUserDetails();
      if (result.name) {
        const nameArray = result.name.split(' ');
        setFirstName(nameArray[0]);
        setLastName(nameArray[1]);
      }
      if (result.pronouns) {
        setPronouns(result.pronouns);
      }
      if (result.email) {
        setEmail(result.email);
      }
    };
    getUser();
  }, []);

  const [image, setImage]: any = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [pronouns, setPronouns] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [update, setUpdate] = useState(false);
  const [error, setError] = useState(false);

  return (
    <View
      style={[
        CoreStyleSheet.viewContainerStyle,
        Platform.OS === 'ios' ? CoreStyleSheet.viewContainerIOSStyle : null,
      ]}>
      <CustomBackButton
        onPress={() => navigationRef.goBack()}
        title="Update Profile"
      />
      {update ? (
        <TouchableOpacity
          style={styles.notification}
          onPress={() => setUpdate(false)}>
          <Text style={[fontStyles.bodyMedium, styles.notificationText]}>
            Your profile has been updated
          </Text>
        </TouchableOpacity>
      ) : null}
      {error ? (
        <TouchableOpacity
          style={[styles.notification, styles.errorNotification]}
          onPress={() => setError(false)}>
          <Text style={[fontStyles.bodyMedium, styles.notificationText]}>
            Please use a correct password
          </Text>
        </TouchableOpacity>
      ) : null}
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.userIconContainer}>
          <UserIcon
            onPress={async () => {
              const imageURL: any = await userImageUpload();
              if (typeof imageURL === 'string') {
                setImage({uri: imageURL});
                navigationRef.navigate('Costs');
              }
            }}
            userImageContainerStyle={styles.userImageContainerStyle}
            userImageStyle={styles.userImageStyle}
            userIconStyle={styles.userIconStyle}
            image={image}
          />
        </View>
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
            autoCapitalize="none"
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
            autoCapitalize="none"
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
            autoCapitalize="none"
          />
        </View>
        <CoreButton
          disabled={password ? false : true}
          value="Update Account"
          style={[styles.updateButton, password ? null : styles.buttonDisabled]}
          onPress={async () => {
            await updateUserAccountDetails({
              firstName,
              lastName,
              pronouns,
              email,
              password,
            });
            setPassword('');
          }}
        />
        <CoreButton value="Delete Account" style={styles.deleteButton} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  notification: {
    width: '100%',
    padding: 15,
    borderRadius: 12,
    backgroundColor: color.Mint[80],
    marginVertical: 10,
  },
  notificationText: {
    color: color.White[100],
    textAlign: 'justify',
  },
  scrollContainer: {
    flex: 1,
    paddingTop: 15,
  },
  userIconContainer: {
    width: '100%',
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  userIconStyle: {
    width: 90,
    height: 90,
  },
  userImageContainerStyle: {
    width: 70,
    height: 70,
  },
  userImageStyle: {
    width: 65,
    height: 65,
  },
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
  deleteButton: {
    marginTop: 25,
    backgroundColor: color.Tomato[100],
    borderColor: color.Tomato[100],
    marginBottom: 55,
  },
  buttonDisabled: {
    backgroundColor: color.Mint[30],
    borderColor: color.Mint[10],
  },
  errorNotification: {
    backgroundColor: color.Tomato[80],
  },
});

export default ProfileScreen;
