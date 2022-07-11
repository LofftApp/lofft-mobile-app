import React, {useState, useEffect, useContext} from 'react';
import {View, ScrollView, Text, StyleSheet, Modal, Alert} from 'react-native';
import storedHobbiesAndValues from '../../data/hobbiesAndValues.json';
import {Context as UserDetails} from '../../context/UserDetailsContext';

// Firebase
import {getCurrentUserDetails} from '../../api/firebase/fireStoreActions';
import auth from '@react-native-firebase/auth';
import {updateUser} from '../../api/firebase/fireStoreActions';
import {libraryImageUpload} from '../../api/firebase/firebaseStorage';

// Components
import TagIcon from '@Icons/TagIcon';
import HobbiesAndValues from '../../components/HobbiesAndValues';
import {CoreButton} from '@Buttons/CoreButton';
import LibrarySection from '@Profile/LibrarySection';
import ProfileHeader from '@Bars/ProfileHeader';
import DescriptionInput from '@Profile/DescriptionInput';

// helpers
import {hobbiesFormatter} from '@Helpers/hobbiesFormatter';

// Stylesheets
import color from '@Assets/lofftColorPallet.json';
import {CoreStyleSheet} from '@StyleSheets/CoreDesignStyleSheet';
import {fontStyles} from '@StyleSheets/FontStyleSheet';
import {navigationRef} from '../../RootNavigation';

const ProfileScreen = ({userID = auth().currentUser.uid}) => {
  const {state, profile, updateProfile, uploadUserImage, photoUserImage} =
    useContext(UserDetails);
  const [modalVisible, setModalVisible] = useState(false);
  const [edit, setEdit] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [name, setName] = useState('');
  const [newName, setNewName] = useState('');
  const [lofft, setLofft] = useState(null);
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
    setUserImage(state.imageURI);
  }, [state.imageURI]);

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
      if (user.libraryURIS) setLibrary(user.libraryURIS);
      if (user.lofft) setLofft(user.lofft.lofftId);
    };
    setUser();
  }, []);

  useEffect(() => {}, []);

  const onSave = () => {
    Object.entries(values).forEach(([k, v]) => {
      v.active = selectedHobbies.includes(k);
    });
    setName(newName);
    setTags(newTags);
    setDescription(newDescription);
    setValues(values);
    updateUser(userID, newName, newDescription, values);
    setEdit(false);
  };

  const onEdit = () => {
    setEdit(true);
    setNewName(name);
    setNewTags(tags);
    setNewDescription(description);
  };

  const onCancel = () => setEdit(false);

  const modalShow = () => setModalVisible(true);

  const updateUserName = t => setNewName(t);

  return (
    <View style={styles.pageContainer}>
      <ProfileHeader
        navigation={navigationRef}
        edit={edit}
        admin={admin}
        onSave={onSave}
        onEdit={onEdit}
        onCancel={onCancel}
        modalShow={modalShow}
        imageURI={userImage}
        name={name}
        newName={newName}
        updateProfileName={updateUserName}
      />
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
          <DescriptionInput
            edit={edit}
            value={description}
            newValue={newDescription}
            onTextChange={t => setNewDescription(t)}
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
          {lofft ? null : (
            <View style={styles.noLofftContainer}>
              <Text style={styles.noLofftText}>👀</Text>
              <Text style={styles.noLofftText}>Nothing to see here</Text>
              <Text style={styles.noLofftText}>They're a newbie</Text>
              <Text style={styles.noLofftText}>...........</Text>
            </View>
          )}
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
  pageContainer: {
    flex: 1,
  },
  pillContainer: {
    flexDirection: 'row',
    marginBottom: 10,
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
