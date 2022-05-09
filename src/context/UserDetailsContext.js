import createUserDetailsContext from './createUserDetailsContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as RootNavigation from '../RootNavigation';

// Firebase 🔥
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {userImageUpload} from '../api/firebase/firebaseStorage';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return {...state, errorMessage: action.payload, userMessage: ''};
    case 'add_message':
      return {...state, errorMessage: '', userMessage: action.payload};
    case 'signin':
      return {
        errorMessage: '',
        uid: action.payload.uid,
        name: action.payload.name,
        imageURI: action.payload.imageURI,
      };
    case 'update_profile_image':
      return {...state, imageURI: action.payload};
    case 'signout':
      return {
        token: null,
        errorMessage: '',
        userMessage: action.payload,
        uid: '',
        name: '',
        imageURI: '',
      };
    case 'reset_messages':
      return {errorMessage: '', userMessage: ''};
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
      .then(response => {
        dispatch({
          type: 'signin',
          payload: {
            uid: response.user.uid,
            name: response.user.displayName,
            imageURI: response.user.photoURL,
          },
        });
      })
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

const profile = dispatch => uid => {
  firestore()
    .collection('Users')
    .doc(uid)
    .get()
    .then(querySnapShot => {
      console.log(querySnapShot);
      // docId = querySnapShot.docs[0].id;
      // details = querySnapShot.docs[0].data();
    });
};

const updateProfile = dispatch => () => {};

const uploadUserImage = dispatch => () => {
  userImageUpload().then(response => {
    dispatch({type: 'update_profile_image', payload: response.imageURI});
    console.log('Updated image');
  });
};

const signout = dispatch => async () => {
  dispatch({
    type: 'signout',
    payload: 'You have succesfully signed out 😥',
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

const resetMessages = dispatch => () => {
  dispatch({type: 'reset_messages', payload: ''});
};

export const {Provider, Context} = createUserDetailsContext(
  authReducer,
  {
    signin,
    signout,
    profile,
    updateProfile,
    signup,
    uploadUserImage,
    activeUser,
    resetMessages,
  },
  {token: null, errorMessage: '', userMessage: ''},
);
