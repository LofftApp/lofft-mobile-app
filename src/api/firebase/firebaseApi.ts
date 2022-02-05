import auth from '@react-native-firebase/auth';

export const addImageToAuth = async url => {
  auth().currentUser.updateProfile({
    photoURL: url,
  });
};
