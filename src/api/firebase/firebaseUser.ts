import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {dateStringFormatter} from '@Helpers/dateFormatter';

// Registration
// ========================================
export const signup = async ({email, password}) => {
  try {
    // const userProfile = {tags: {}, diet: '', pronouns: ''};
    // const looking = false;
    const response = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );
    return response;
    // firestore()
    //   .collection('Users')
    //   .doc(response.user.uid)
    //   .set({uid: response.user.uid, email, userProfile, looking});
  } catch (error) {
    return error;
    switch (error.code) {
      case 'auth/email-already-in-use':
        console.log('This e-mail is already registered');
        break;
      case 'auth/invalid-email':
        console.log('Please use a valid e-mail');
        break;
      default:
        console.log('Something went wrong');
        break;
    }
  }
};

// Signin and Signout
// ========================================
export const signin = ({email, password}) => {
  try {
    auth().signInWithEmailAndPassword(email, password);
  } catch (error) {
    switch (error.code) {
      case 'auth/email-already-in-use':
        console.log('This e-mail is already registered');
        break;
      case 'auth/invalid-email':
        console.log('Please use a valid e-mail');
        break;
      case 'auth/wrong-password':
        console.log('Wrong password entered');
        break;
      default:
        console.log('Something went wrong');
        break;
    }
  }
};

export const signout = () => {
  auth().signOut();
};

// User Profile update and edit
// ========================================
