// This is the API for storing data within firebase container storage system.
import {utils} from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import {launchImageLibrary} from 'react-native-image-picker';
import {uploadImageToUserProfile} from './fireStoreActions';
import {addImageToAuth} from './firebaseApi';
import auth from '@react-native-firebase/auth';

if (__DEV__) {
  storage().useEmulator('localhost', 9199);
}

export const userImageUpload = docId => {
  const response = url => {
    return url;
  };
  auth().onAuthStateChanged(async user => {
    if (user) {
      const result = await launchImageLibrary({mediaType: 'photo'});
      const reference = storage().ref(`${user.uid}/userImage/profile.jpg`);
      const pathToFile = `${utils.FilePath.TEMP_DIRECTORY}/${result.assets[0].fileName}`;
      // Upload file
      await reference.putFile(pathToFile);
      const url = await reference.getDownloadURL();
      if (url) {
        addImageToAuth(url);
        uploadImageToUserProfile(docId, url);
        response(url);
      } else {
        return {message: 'Action Cancelled'};
      }
    }
  });
};
