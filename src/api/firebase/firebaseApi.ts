import auth from '@react-native-firebase/auth';

export const getCurrentUser = () => {
  return auth().currentUser;
};

export const authUserWithEmailAndPassword = (email, password) => {
  auth().signInWithEmailAndPassword(email, password);
};

export const addImageToAuth = async url => {
  auth().currentUser.updateProfile({
    photoURL: url,
  });
};
