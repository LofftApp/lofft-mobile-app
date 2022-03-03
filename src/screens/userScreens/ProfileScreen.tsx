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
import TagIcon from '../../components/iconsAndContainers/TagIcon';

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
  const [name, setName] = useState('');
  const [tags, setTags] = useState([]);

  useEffect(() => {
    setTags([]);
    const getUser = async user => {
      const result = await getCurrentUserDetails(user);
      if (result.details.imageURI) setImage({uri: result.details.imageURI});
      if (result.details.name) {
        setName(result.details.name);
      }
      if (result.details.pronouns) {
        setTags(tags => [
          ...tags,
          {value: result.details.pronouns, color: 'Mint'},
        ]);
      }
      if (result.details.status) {
        setTags(tags => [
          ...tags,
          {value: result.details.status, color: 'Lavendar'},
        ]);
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
          <Text style={[fontStyles.headerMedium, styles.header]}>{name}</Text>
          <Image source={userImage} style={styles.userImage} />
        </View>
      </ImageBackground>
      <View style={CoreStyleSheet.viewContainerStyle}>
        <View style={styles.pillContainer}>
          {tags.map(tag => {
            return (
              <TagIcon text={tag.value} key={tag.value} userColor={tag.color} />
            );
          })}
        </View>
        <Text style={[fontStyles.bodySmall, styles.userText]}>
          Hi, i’m hans, I recently moved to Berlin and am looking for a Lofft
          space. I am Vegan and love a few drinks and to party most weekend. I
          am looking for a lofft that is social and active.{' '}
        </Text>
        <Text style={fontStyles.buttonTextMedium}>Previous Loffts</Text>
        <View style={styles.noLofftContainer}>
          <Text style={styles.noLofftText}>👀</Text>
          <Text style={styles.noLofftText}>Nothing to see here</Text>
          <Text style={styles.noLofftText}>He's a newbie</Text>
          <Text style={styles.noLofftText}>...........</Text>
        </View>
        <Text style={fontStyles.buttonTextMedium}>Photo Library</Text>
        <View style={styles.noLofftContainer}>
          <View style={styles.addImageButton}>
            <Icon name="add-outline" size={60} color={color.Black[30]} />
          </View>
        </View>
        <Text style={fontStyles.buttonTextMedium}>Hobbies</Text>
        <View style={styles.hobbyContaner}>
          <View style={styles.hobby}>
            <Icon name="megaphone-outline" size={36} color={color.Black[100]} />
            <Text style={[fontStyles.bodySmall, styles.hobbyText]}>
              Politics
            </Text>
          </View>
          <View style={styles.hobby}>
            <Icon
              name="restaurant-outline"
              size={36}
              color={color.Black[100]}
            />
            <Text style={[fontStyles.bodySmall, styles.hobbyText]}>Cookng</Text>
          </View>
          <View style={styles.hobby}>
            <Icon name="fast-food-outline" size={36} color={color.Black[100]} />
            <Text style={[fontStyles.bodySmall, styles.hobbyText]}>
              Eating Out
            </Text>
          </View>
          <View style={styles.hobby}>
            <Icon name="happy-outline" size={36} color={color.Black[100]} />
            <Text style={[fontStyles.bodySmall, styles.hobbyText]}>
              Meditation
            </Text>
          </View>
          {/* Add Spotify / Apple Music API here */}
        </View>
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
  pillContainer: {
    flexDirection: 'row',
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
    maxWidth: '60%',
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
    marginRight: 15,
  },
  fontColor: {
    color: color.Lavendar[100],
  },
  userText: {
    textAlign: 'justify',
    color: color.Black[50],
    marginVertical: 15,
  },
  noLofftContainer: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 15,
  },
  noLofftText: {
    color: color.Black[50],
    marginVertical: 3,
  },
  addImageButton: {
    width: 95,
    height: 95,
    backgroundColor: color.Black[10],
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  hobbyContaner: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  hobby: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    flexBasis: '50%',
  },
  hobbyText: {
    marginHorizontal: 20,
  },
});

export default ProfileScreen;
