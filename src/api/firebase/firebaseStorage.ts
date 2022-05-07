// This is the API for storing data within firebase container storage system.
import {utils} from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {uploadImageToUserProfile} from './fireStoreActions';
import {addImageToAuth} from './firebaseApi';
import auth from '@react-native-firebase/auth';

if (__DEV__) {
  let host = 'localhost';
  // If using Mobile device set the host as local IP set host in App.js and wihtin the firebase.json for each method
  host = '192.168.1.80';
  storage().useEmulator(host, 9199);
}

export const userImageUpload = async docId => {
  const user = auth().currentUser;
  const result = await launchImageLibrary({mediaType: 'photo'});
  const reference = storage().ref(`${user.uid}/userImage/profile.jpg`);
  const pathToFile = `${utils.FilePath.TEMP_DIRECTORY}/${result.assets[0].fileName}`;
  // Upload file
  await reference.putFile(pathToFile);
  const url = await reference.getDownloadURL();
  if (url) {
    addImageToAuth(url);
    uploadImageToUserProfile(docId, url);
    return url;
  }
};

export const userTakePhoto = async docId => {
  const user = auth().currentUser;
  const result = await launchCamera({mediaType: 'photo'});
  console.log(result);
};
