import auth from '@react-native-firebase/auth';

if (__DEV__) {
  console.log('Development Authentication Environment');
  auth().useEmulator('http://192.168.0.123:9099');
}

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
