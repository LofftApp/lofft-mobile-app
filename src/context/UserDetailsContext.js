import createUserDetailsContext from './createUserDetailsContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as RootNavigation from '../RootNavigation';

// Firebase 🔥
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return {...state, errorMessage: action.payload};
    case 'signin':
      return {errorMessage: '', token: action.payload};
    case 'signout':
      return {token: null, errorMessage: ''};
    default:
      return state;
  }
};

const signup =
  dispatch =>
  async ({email, password}) => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(response => {
        const userProfile = {tags: {}, diet: '', pronouns: ''};
        const looking = false;
        firestore()
          .collection('Users')
          .doc(response.user.uid)
          .set({uid: response.user.uid, email, userProfile, looking});
      })
      .catch(error => {
        console.log(error.code);
        if (error.code === 'auth/email-already-in-use') {
          console.log('This e-mail is already registered');
        }
        if (error.code === 'auth/invalid-email') {
          console.log('Please use a valid e-mail');
        }
      });
  };

const signin =
  dispatch =>
  async ({email, password}) => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => {
        console.log(error.code);
        if (error.code === 'auth/email-already-in-use') {
          console.log('This e-mail is already registered');
        }
        if (error.code === 'auth/invalid-email') {
          console.log('Please use a valid e-mail');
        }
        if (error.code === 'auth/wrong-password') {
          console.log('Wrong password entered');
        }
      });
  };

const signout = dispatch => async () => {
  auth().signOut();
};

const activeUser = dispatch => async () => {
  let userToken;
  try {
    userToken = await AsyncStorage.getItem('token');
  } catch (error) {
    return;
  }
  dispatch({type: 'signin', payload: userToken});
};

export const {Provider, Context} = createUserDetailsContext(
  authReducer,
  {signin, signout, signup, activeUser},
  {token: null, errorMessage: ''},
);
