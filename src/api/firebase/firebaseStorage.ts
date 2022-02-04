// This is the API for storing data within firebase container storage system.
import {utils} from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import {launchImageLibrary} from 'react-native-image-picker';
import {uploadImageToUserProfile} from './fireStoreActions';
import {getCurrentUser, addImageToAuth} from './firebaseApi';

if (__DEV__) {
  storage().useEmulator('192.168.0.123', 9199);
}

export const userImageUpload = async docId => {
  const currentUser = await getCurrentUser();
  const result = await launchImageLibrary({mediaType: 'photo'});
  const reference = storage().ref(`${currentUser.uid}/userImage/profile.jpg`);
  const pathToFile = `${utils.FilePath.TEMP_DIRECTORY}/${result.assets[0].fileName}`;
  // Upload file
  await reference.putFile(pathToFile);
  const url = await reference.getDownloadURL();
  if (url) {
    addImageToAuth(url);
    uploadImageToUserProfile(docId, url);
    return url;
  } else {
    return {message: 'Action Cancelled'};
  }
};
