import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  ImageBackground,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import storedHobbiesAndValues from '../../data/hobbiesAndValues.json';
import FastImage from 'react-native-fast-image';
import {Context as UserDetails} from '../../context/UserDetailsContext';

// Firebase
import {getCurrentUserDetails} from '../../api/firebase/fireStoreActions';
import auth from '@react-native-firebase/auth';
import {updateUser} from '../../api/firebase/fireStoreActions';
import {
  userTakePhoto,
  userImageUpload,
  libraryImageUpload,
} from '../../api/firebase/firebaseStorage';

// Components
import CustomBackButton from '../../components/buttons/CustomBackButton';
import UserIcon from '../../components/iconsAndContainers/UserIcon';
import Icon from 'react-native-vector-icons/Ionicons';
import TagIcon from '../../components/iconsAndContainers/TagIcon';
import EditPageButton from '../../components/buttons/EditPageButton';
import HobbiesAndValues from '../../components/HobbiesAndValues';
import {CoreButton} from '../../components/buttons/CoreButton';
import LibrarySection from '../../components/profileSections/LibrarySection';

// helpers
import {hobbiesFormatter} from '../../components/helperFunctions/hobbiesFormatter';

// Stylesheets
import color from './../../assets/defaultColorPallet.json';
import {CoreStyleSheet} from '../../StyleSheets/CoreDesignStyleSheet';
import {fontStyles} from './../../StyleSheets/FontStyleSheet';
import {navigationRef} from '../../RootNavigation';

// Images
import blueBackground from '../../assets/backgroundShapes/blue.png';
import EditableTextField from '../../components/inputFields/EditableTextFields';

const ProfileScreen = ({userID = auth().currentUser.uid}) => {
  const {state, profile, updateProfile, uploadUserImage} =
    useContext(UserDetails);
  const [modalVisible, setModalVisible] = useState(false);
  const [docId, setDocId] = useState('');
  const [edit, setEdit] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [name, setName] = useState('');
  const [newName, setNewName] = useState('');
  const [tags, setTags] = useState([]);
  const [newTags, setNewTags] = useState([]);
  const [userImage, setUserImage] = useState('');
  const [description, setDescription] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [values, setValues] = useState({});
  const [pronouns, setPronouns] = useState('He/Him');
  const [library, setLibrary] = useState([]);

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

  // Set Admin
  useEffect(() => {
    if (userID === state.uid) setAdmin(true);
  }, []);

  // SetUserImage and assign current user Image
  useEffect(() => {
    if (userID === state.uid && state.imageURI) {
      setUserImage(state.imageURI);
    }
  }, [state.imageURI, state.uid, userID]);

  // Sets core details name, description
  useEffect(() => {
    const setUser = async () => {
      const user = await getCurrentUserDetails(userID);
      if (user.name) setName(user.name);
      if (user.userProfile) {
        const uProfile = user.userProfile;
        if (uProfile.description) setDescription(uProfile.description);
        if (uProfile.hobbiesAndValues) {
          setValues(uProfile.hobbiesAndValues);
          setSelectedHobbies(
            hobbiesFormatter(uProfile.hobbiesAndValues, selectedHobbies),
          );
        } else {
          setValues(storedHobbiesAndValues);
        }
      }
    };
    setUser();
  }, []);

  useEffect(() => {
    // setTags([]);
    // const result = await getCurrentUserDetails(user);
    // setDocId(result.docId);
    // result.details.imageURI
    //   ? setUserImage(result.details.imageURI)
    //   : setUserImage(null);
    // if (result.details.name) {
    //   setName(result.details.name);
    // }
    // if (result.details.userProfile && result.details.userProfile.description) {
    //   setDescription(result.details.userProfile.description);
    // }
    // if (auth().currentUser.uid === result.details.uid) {
    //   setAdmin(true);
    // }
    // if (
    //   result.details.userProfile &&
    //   result.details.userProfile.hobbiesAndValues
    // ) {
    //   setValues(result.details.userProfile.hobbiesAndValues);
    //   Object.entries(result.details.userProfile.hobbiesAndValues).forEach(
    //     ([k, v]) => {
    //       if (v.active) {
    //         if (!selectedHobbies.includes(k)) {
    //           setSelectedHobbies(selectedHobbies => [...selectedHobbies, k]);
    //         }
    //       }
    //     },
    //   );
    // } else {
    //   setValues(storedHobbiesAndValues);
    // }
    // if (result.details.status) {
    //   setTags(tags => [
    //     ...tags,
    //     {value: result.details.status, color: 'Lavendar'},
    //   ]);
    // }
    // if (result.details.userProfile && result.details.userProfile.pronouns) {
    //   setTags(tags => [
    //     ...tags,
    //     {value: result.details.userProfile.pronouns, color: 'Mint'},
    //   ]);
    // }
    // if (result.details.userProfile && result.details.userProfile.diet) {
    //   setTags(tags => [
    //     ...tags,
    //     {value: result.details.userProfile.diet, color: 'Gold'},
    //   ]);
    // }
    // if (result.details.libraryURIS) {
    //   setLibrary(result.details.libraryURIS);
    // }
    // auth().onAuthStateChanged(user => {
    //   if (user) {
    //     getUser(user);
    //   }
    // });
  }, []);

  return (
    <View style={styles.pageContainer}>
      <ImageBackground source={blueBackground} style={styles.headerBackground}>
        <View style={styles.topBarWithEdit}>
          {edit ? null : (
            <CustomBackButton
              style={styles.backButton}
              neutral={true}
              onPress={() => navigationRef.goBack()}
            />
          )}

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
        <View style={styles.imageHeaderContainer}>
          <TouchableOpacity
            disabled={edit ? false : true}
            onPress={() => {
              setModalVisible(true);
            }}>
            <FastImage
              source={{uri: userImage}}
              style={styles.userImage}
              resizeMode={FastImage.resizeMode.cover}
            />
          </TouchableOpacity>
          <View style={styles.nameAndEditContainer}>
            {name || edit ? (
              <EditableTextField
                placeholder="Name"
                edit={edit}
                value={state.name}
                newValue={newName}
                fontStyle={fontStyles.headerSmall}
                multiline={true}
                onChangeText={t => setNewName(t)}
              />
            ) : null}
          </View>
        </View>
      </ImageBackground>
      <ScrollView style={CoreStyleSheet.viewContainerStyle}>
        {/* Tags */}
        <View style={styles.pillContainer}>
          <TagIcon text="Add more" userColor="Lavendar" />
          <TagIcon text="Looking" userColor="Gold" />
          <TagIcon text={pronouns} userColor="Blue" />
          {tags.map(tag => {
            return (
              <TagIcon
                text={tag.value}
                key={tag.value}
                userColor={tag.color}
                idTags
              />
            );
          })}
        </View>

        {description || edit ? (
          <EditableTextField
            placeholder="Description"
            edit={edit}
            value={description}
            newValue={newDescription}
            fontStyle={fontStyles.bodySmall}
            multiline={true}
            onChangeText={t => setNewDescription(t)}
            inputFieldStyle={[
              styles.descriptionStyle,
              styles.descriptionStyleInput,
            ]}
            textStyle={[styles.descriptionStyle]}
          />
        ) : null}
        <View style={styles.sectionContainer}>
          <HobbiesAndValues
            values={values}
            selectHobby={k => selectHobby(k)}
            selectedHobbies={selectedHobbies}
            edit={edit}
          />
        </View>

        {/* Library Section */}
        <LibrarySection
          onPress={() => libraryImageUpload(5 - library.length)}
          library={library}
          edit={edit}
        />
        <View style={styles.sectionContainer}>
          <Text style={fontStyles.buttonTextMedium}>Loffts</Text>
          <View style={styles.noLofftContainer}>
            <Text style={styles.noLofftText}>👀</Text>
            <Text style={styles.noLofftText}>Nothing to see here</Text>
            <Text style={styles.noLofftText}>They're a newbie</Text>
            <Text style={styles.noLofftText}>...........</Text>
          </View>
        </View>

        {/* Add Spotify / Apple Music API here */}
      </ScrollView>
      <Modal
        transparent={true}
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed');
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <View>
              <CoreButton
                value="Upload Image"
                style={[styles.modalButton]}
                onPress={async () => {
                  // const imageURI = await userImageUpload();
                  uploadUserImage();
                  setModalVisible(false);
                }}
              />
              <CoreButton
                value="Take Photo"
                style={[styles.modalButton]}
                invert
                onPress={async () => {
                  const imageURI = await userTakePhoto();
                  setUserImage({imageURI});

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
  topBarWithEdit: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'baseline',
  },
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
    marginBottom: 10,
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
    width: 78,
    height: 78,
    borderWidth: 4,
    borderColor: color.Blue[100],
    borderRadius: 75,
  },
  nameAndEditContainer: {
    alignItems: 'flex-end',
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
  descriptionStyle: {
    marginBottom: 15,
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 5,
  },
  sectionContainer: {
    marginVertical: 15,
  },
  descriptionStyleInput: {
    borderWidth: 1,
    borderColor: color.Black[25],
    color: color.Black[100],
    width: '100%',
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
  // addImageButton: {
  //   width: 95,
  //   height: 95,
  //   backgroundColor: color.Black[10],
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   borderRadius: 8,
  //   alignSelf: 'flex-start',
  // },
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

export default ProfileScreen;
