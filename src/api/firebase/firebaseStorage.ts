// This is the API for storing data within firebase container storage system.
import {utils} from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  uploadImageToUserProfile,
  uploadLibraryImagesToUserProfile,
  deleteImageFromImageLibraryRef,
} from './fireStoreActions';
import {addImageToAuth} from './firebaseApi';
import auth from '@react-native-firebase/auth';

if (__DEV__) {
  let host = 'localhost';
  // If using Mobile device set the host as local IP set host in App.js and wihtin the firebase.json for each method
  host = '192.168.0.123';
  storage().useEmulator(host, 9199);
}

const randomFileName = () => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

const saveProfileImage = (user, url) => {
  addImageToAuth(url);
  uploadImageToUserProfile(user.uid, url);
  return url;
};

const saveImageLibrary = (user, urls) => {
  uploadLibraryImagesToUserProfile(user.uid, urls);
};

const uploadUserImages = async (results, path) => {
  const user = auth().currentUser;
  const urls = await Promise.all(
    results.assets.map(async asset => {
      const newFileName = randomFileName();
      const pathToFile = `${utils.FilePath.TEMP_DIRECTORY}/${asset.fileName}`;
      const reference = storage().ref(`${user.uid}/${path}/${newFileName}.jpg`);
      await reference.putFile(pathToFile);
      return await reference.getDownloadURL();
    }),
  );

  if (path === 'userImage') {
    const image = saveProfileImage(user, urls[0]);
    return image;
  } else if (path === 'imageLibrary') {
    saveImageLibrary(user, urls);
  }
};

export const userImageUpload = async () => {
  const results = await launchImageLibrary({mediaType: 'photo'});
  if (!results.didCancel) {
    return uploadUserImages(results, 'userImage');
  }
  return false;
};

export const userTakePhoto = async () => {
  const results = await launchCamera({mediaType: 'photo'});
  if (!results.didCancel) {
    return uploadUserImages(results, 'userImage');
  }
  return false;
};

export const libraryImageUpload = async limit => {
  const results = await launchImageLibrary({
    mediaType: 'photo',
    selectionLimit: limit,
  });
  if (!results.didCancel) {
    uploadUserImages(results, 'imageLibrary');
  }
};

export const deleteLibraryImage = url => {
  const user = auth().currentUser.uid;
  const imageRef = storage().refFromURL(url);
  imageRef.delete();
  deleteImageFromImageLibraryRef(user, url);
};
