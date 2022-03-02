import React, {useState, useEffect} from 'react';
import {
  View,
  ImageBackground,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  TextInput,
  Image,
} from 'react-native';

// Firebase
import {
  getCurrentUserDetails,
  updateUserAccountDetails,
} from '../../api/firebase/fireStoreActions';
import {userImageUpload} from '../../api/firebase/firebaseStorage';
import auth from '@react-native-firebase/auth';

// Components
import CustomBackButton from '../../components/buttons/CustomBackButton';
import UserIcon from '../../components/iconsAndContainers/UserIcon';
import Icon from 'react-native-vector-icons/Ionicons';

// Stylesheets
import color from './../../assets/defaultColorPallet.json';
import {CoreStyleSheet} from '../../StyleSheets/CoreDesignStyleSheet';
import {fontStyles} from './../../StyleSheets/FontStyleSheet';
import {navigationRef} from '../../RootNavigation';
import {CoreButton} from '../../components/buttons/CoreButton';

// Images
import blueBackground from '../../assets/backgroundShapes/blue.png';
import userImage from '../../assets/user.jpeg';

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
    <View style={styles.pageContainer}>
      <ImageBackground source={blueBackground} style={styles.headerBackground}>
        <CustomBackButton style={styles.backButton} neutral={true} />
        <View style={styles.imageHeaderContainer}>
          <Text style={[fontStyles.headerMedium, styles.header]}>
            Hans Müller
          </Text>
          <Image source={userImage} style={styles.userImage} />
        </View>
      </ImageBackground>
      <View style={CoreStyleSheet.viewContainerStyle}>
        <View>
          <View style={[styles.pill]}>
            <Text style={[fontStyles.bodyExtraSmall, styles.fontColor]}>
              Looking
            </Text>
          </View>
        </View>
        <Text style={[fontStyles.bodySmall, styles.userText]}>
          Hi, i’m hans, I recently moved to Berlin and am looking for a Lofft
          space. I am Vegan and love a few drinks and to party most weekend. I
          am looking for a lofft that is social and active.{' '}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },
  headerBackground: {
    width: '100%',
    height: 200,
    backgroundColor: color.Blue[10],
  },
  backButton: {
    marginHorizontal: 15,
    marginTop: 35,
  },
  imageHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'flex-end',
    paddingBottom: 10,
    paddingHorizontal: 15,
  },
  header: {
    // alignSelf: 'flex-end',
  },
  userImage: {
    width: 90,
    height: 90,
    borderWidth: 4,
    borderColor: color.Blue[100],
    borderRadius: 75,
  },
  pill: {
    width: 78,
    height: 19,
    borderWidth: 1,
    borderColor: color.Lavendar[100],
    borderRadius: 6,
    backgroundColor: color.Lavendar[5],
    justifyContent: 'center',
    alignItems: 'center',
  },
  fontColor: {
    color: color.Lavendar[100],
  },
  userText: {
    textAlign: 'justify',
    color: color.Black[50],
    marginVertical: 15,
  },
});

export default ProfileScreen;
