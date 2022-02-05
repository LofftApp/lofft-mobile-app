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
import auth from '@react-native-firebase/auth';

// Components
import CustomBackButton from '../../components/CustomBackButton';
import UserIcon from '../../components/UserIcon';
import Icon from 'react-native-vector-icons/Ionicons';

// Stylesheets
import color from './../../assets/defaultColorPallet.json';
import {CoreStyleSheet} from '../../StyleSheets/CoreDesignStyleSheet';
import {fontStyles} from './../../StyleSheets/FontStyleSheet';
import {navigationRef} from '../../RootNavigation';
import {CoreButton} from '../../components/CoreButton';

const ProfileScreen = () => {
  const [image, setImage]: any = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [pronouns, setPronouns] = useState('');
  const [email, setEmail] = useState('');
  const [update, setUpdate] = useState(false);
  const [docId, setDocId] = useState('');

  useEffect(() => {
    const getUser = async user => {
      const result = await getCurrentUserDetails(user);
      setDocId(result.docId);
      if (result.details.imageURI) setImage({uri: result.details.imageURI});
      if (result.details.name) {
        const nameArray = result.details.name.split(' ');
        setFirstName(nameArray[0]);
        setLastName(nameArray[1]);
      }
      if (result.details.pronouns) {
        setPronouns(result.details.pronouns);
      }
      if (result.details.email) {
        setEmail(result.details.email);
      }
    };

    auth().onAuthStateChanged(user => {
      if (user) {
        getUser(user);
      }
    });
  }, []);

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
          <Icon name="close-outline" size={30} color={color.White[80]} />
        </TouchableOpacity>
      ) : null}
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.userIconContainer}>
          <UserIcon
            onPress={async () => {
              const imageURL: any = await userImageUpload(docId);
              if (typeof imageURL === 'string') {
                setImage({uri: imageURL});
                setUpdate(true);
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
        <View style={styles.buttonContainer}>
          <CoreButton
            value="Update Account"
            style={[styles.button, styles.updateButton]}
            onPress={async () => {
              await updateUserAccountDetails({
                firstName,
                lastName,
                pronouns,
                email,
                docId,
              });
              setUpdate(true);
            }}
          />
          <CoreButton
            value="Delete Account"
            style={[styles.button, styles.deleteButton]}
          />
        </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  buttonContainer: {
    marginTop: 50,
  },
  button: {
    marginVertical: 5,
  },
  updateButton: {
    backgroundColor: color.Mint[100],
    borderColor: color.Mint[100],
  },
  deleteButton: {
    backgroundColor: color.Tomato[100],
    borderColor: color.Tomato[100],
  },
  errorNotification: {
    backgroundColor: color.Tomato[80],
  },
});

export default ProfileScreen;
