import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// Authentication Signin, Signup and Signout Methods
export const signup = ({email, password}) => {
  try {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(response => {
        const userProfile = {tags: {}, diet: '', pronouns: ''};
        const looking = false;
        firestore()
          .collection('Users')
          .doc(response.user.uid)
          .set({uid: response.user.uid, email, userProfile, looking});
      });
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      console.log('This e-mail is already registered');
    }
    if (error.code === 'auth/invalid-email') {
      console.log('Please use a valid e-mail');
    }
  }
};

export const signin = ({email, password}) => {
  try {
    auth().signInWithEmailAndPassword(email, password);
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      console.log('This e-mail is already registered');
    }
    if (error.code === 'auth/invalid-email') {
      console.log('Please use a valid e-mail');
    }
  }
};

export const signout = () => {
  auth().signOut();
};

export const addImageToAuth = async url => {
  auth().currentUser.updateProfile({
    photoURL: url,
  });
};

export const getUser = user => {
  console.log(`user: ${user}`);
};
