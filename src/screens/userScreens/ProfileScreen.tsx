import React, {useState, useEffect} from 'react';
import {
  View,
  ImageBackground,
  ScrollView,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import storedHobbiesAndValues from '../../data/hobbiesAndValues.json';

// Firebase
import {getCurrentUserDetails} from '../../api/firebase/fireStoreActions';
import auth from '@react-native-firebase/auth';
import {updateUser} from '../../api/firebase/fireStoreActions';

// Components
import CustomBackButton from '../../components/buttons/CustomBackButton';
import Icon from 'react-native-vector-icons/Ionicons';
import TagIcon from '../../components/iconsAndContainers/TagIcon';
import EditPageButton from '../../components/buttons/EditPageButton';
import HobbiesAndValues from '../../components/HobbiesAndValues';

// Stylesheets
import color from './../../assets/defaultColorPallet.json';
import {CoreStyleSheet} from '../../StyleSheets/CoreDesignStyleSheet';
import {fontStyles} from './../../StyleSheets/FontStyleSheet';
import {navigationRef} from '../../RootNavigation';

// Images
import blueBackground from '../../assets/backgroundShapes/blue.png';
import imagePlaceholder from '../../assets/user.jpeg';
import EditableTextField from '../../components/inputFields/EditableTextFields';

const ProfileScreen = () => {
  const [docId, setDocId] = useState('');
  const [edit, setEdit] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [name, setName] = useState('');
  const [newName, setNewName] = useState('');
  const [tags, setTags] = useState([]);
  const [newTags, setNewTags] = useState([]);
  const [userImage, setUserImage] = useState({});
  const [description, setDescription] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [values, setValues] = useState({});

  const [selectedHobbies, setSelectedHobbies] = useState([]);
  const selectHobby = key => {
    if (!selectedHobbies.includes(key)) {
      setSelectedHobbies(selectedHobbies => [...selectedHobbies, key]);
    } else {
      const result = selectedHobbies.filter(el => {
        return el !== key;
      });
      setSelectedHobbies(result);
    }
  };

  useEffect(() => {
    setTags([]);
    const getUser = async user => {
      const result = await getCurrentUserDetails(user);
      setDocId(result.docId);
      result.details.imageURI
        ? setUserImage(result.details.imageURI)
        : setUserImage(imagePlaceholder);
      if (result.details.name) {
        setName(result.details.name);
      }
      // if (result.details.status) {
      //   setTags(tags => [
      //     ...tags,
      //     {value: result.details.status, color: 'Lavendar'},
      //   ]);
      // }
      // if (result.details.pronouns) {
      //   setTags(tags => [
      //     ...tags,
      //     {value: result.details.pronouns, color: 'Mint'},
      //   ]);
      // }
      if (
        result.details.userProfile &&
        result.details.userProfile.description
      ) {
        setDescription(result.details.userProfile.description);
      }
      if (auth().currentUser.uid === result.details.uid) {
        setAdmin(true);
      }
      if (
        result.details.userProfile &&
        result.details.userProfile.hobbiesAndValues
      ) {
        setValues(result.details.userProfile.hobbiesAndValues);
        Object.entries(result.details.userProfile.hobbiesAndValues).forEach(
          ([k, v]) => {
            if (v.active) {
              if (!selectedHobbies.includes(k)) {
                setSelectedHobbies(selectedHobbies => [...selectedHobbies, k]);
              }
            }
          },
        );
      } else {
        setValues(storedHobbiesAndValues);
      }
      // if (result.details.profile.diet) {
      //   setTags(tags => [
      //     ...tags,
      //     {value: result.details.profile.diet, color: 'Gold'},
      //   ]);
      // }
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
        <CustomBackButton
          style={styles.backButton}
          neutral={true}
          onPress={() => navigationRef.goBack()}
        />
        <View style={styles.imageHeaderContainer}>
          <Image source={userImage} style={styles.userImage} />
          <EditPageButton
            edit={edit}
            admin={admin}
            onPressSave={() => {
              Object.entries(values).forEach(([k, v]) => {
                v.active = selectedHobbies.includes(k);
              });
              setName(newName);
              setTags(newTags);
              setDescription(newDescription);
              setValues(values);
              updateUser(docId, newName, newDescription, values);
              setEdit(false);
            }}
            onPressCancel={() => setEdit(false)}
            onPressEdit={() => {
              setEdit(true);
              setNewName(name);
              setNewTags(tags);
              setNewDescription(description);
            }}
          />
        </View>
      </ImageBackground>
      <ScrollView style={CoreStyleSheet.viewContainerStyle}>
        <View style={styles.pillContainer}>
          {tags.map(tag => {
            return (
              <TagIcon text={tag.value} key={tag.value} userColor={tag.color} />
            );
          })}
        </View>
        {name || edit ? (
          <EditableTextField
            placeholder="Name"
            edit={edit}
            value={name}
            newValue={newName}
            fontStyle={fontStyles.headerSmall}
            multiline={true}
            onChangeText={t => setNewName(t)}
          />
        ) : null}
        {description || edit ? (
          <EditableTextField
            placeholder="Description"
            edit={edit}
            value={description}
            newValue={newDescription}
            fontStyle={fontStyles.bodySmall}
            multiline={true}
            onChangeText={t => setNewDescription(t)}
          />
        ) : null}

        <Text style={fontStyles.buttonTextMedium}>Loffts</Text>
        <View style={styles.noLofftContainer}>
          <Text style={styles.noLofftText}>👀</Text>
          <Text style={styles.noLofftText}>Nothing to see here</Text>
          <Text style={styles.noLofftText}>They're a newbie</Text>
          <Text style={styles.noLofftText}>...........</Text>
        </View>
        <Text style={fontStyles.buttonTextMedium}>Photo Library</Text>
        <View style={styles.noLofftContainer}>
          <View style={styles.addImageButton}>
            <Icon name="add-outline" size={60} color={color.Black[30]} />
          </View>
        </View>
        <HobbiesAndValues
          values={values}
          selectHobby={k => selectHobby(k)}
          selectedHobbies={selectedHobbies}
          edit={edit}
        />

        {/* Add Spotify / Apple Music API here */}
      </ScrollView>
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
