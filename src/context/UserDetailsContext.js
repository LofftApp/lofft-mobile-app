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
    case 'add_message':
      return {...state, userMessage: action.payload};
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
        if (error.code === 'auth/email-already-in-use') {
          dispatch({
            type: 'add_error',
            payload: 'This e-mail has already been used',
          });
        }
        if (error.code === 'auth/invalid-email') {
          dispatch({
            type: 'add_error',
            payload: 'This e-mail is not valid',
          });
        }
      });
  };

const signin =
  dispatch =>
  async ({email, password}) => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => {
        if (error.code === 'auth/user-not-found') {
          dispatch({
            type: 'add_error',
            payload: 'This e-mail has not been registered',
          });
        }
        if (error.code === 'auth/invalid-email') {
          dispatch({
            type: 'add_error',
            payload: 'This e-mail address is invalid',
          });
        }
        if (error.code === 'auth/wrong-password') {
          dispatch({
            type: 'add_error',
            payload: 'Please use a valid password',
          });
        }
      });
  };

const signout = dispatch => async () => {
  console.log('User Signed out');
  dispatch({
    type: 'add_message',
    payload: 'You have succesfully signedout 😥',
  });
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
  {token: null, errorMessage: '', userMessage: ''},
);
