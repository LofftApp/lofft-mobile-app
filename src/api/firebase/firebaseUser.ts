import auth from '@react-native-firebase/auth';
import {authError} from '@Helpers/authErrorHandling';
import firestore from '@react-native-firebase/firestore';
import {dateStringFormatter} from '@Helpers/dateFormatter';

// Registration
// ========================================
export const signup = async ({email, password}) => {
  try {
    const userProfile = {tags: {}, diet: '', pronouns: ''};
    const looking = false;
    const response = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );
    firestore()
      .collection('Users')
      .doc(response.user.uid)
      .set({uid: response.user.uid, email, userProfile, looking});
    return {type: 'Success', response};
  } catch (error) {
    return authError(error.code);
  }
};

// Signin and Signout
// ========================================
export const signin = ({email, password}) => {
  try {
    auth().signInWithEmailAndPassword(email, password);
  } catch (error) {
    return authError(error.code);
  }
};

export const signout = () => {
  auth().signOut();
};

// User Profile update and edit
// ========================================
