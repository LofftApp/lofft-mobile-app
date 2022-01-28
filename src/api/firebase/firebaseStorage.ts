// This is the API for storing data within firebase container storage system.
import auth from '@react-native-firebase/auth';
import {utils} from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import {launchImageLibrary} from 'react-native-image-picker';

if (__DEV__) {
  console.log('Firebase Storage Environment');
  auth().useEmulator('http://localhost:9099');
  storage().useEmulator('localhost', 9199);
}

export const userImageUpload = async () => {
  const currentUser: any = await auth().currentUser.uid;
  const result = await launchImageLibrary({mediaType: 'photo'});
  const reference = storage().ref(`${currentUser}/userImage/profile.jpg`);
  const pathToFile = `${utils.FilePath.TEMP_DIRECTORY}/${result.assets[0].fileName}`;
  // Upload file
  await reference.putFile(pathToFile);
  const url = await reference.getDownloadURL();
  if (url) {
    auth().currentUser.updateProfile({
      photoURL: url,
    });
    return url;
  } else {
    return {message: 'Action Cancelled'};
  }
};
