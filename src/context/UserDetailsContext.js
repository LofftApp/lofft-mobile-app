import createUserDetailsContext from './createUserDetailsContext';
import {signup as signupFirebase} from '@Firebase/firebaseUser';
// import * as RootNavigation from '../RootNavigation';

// Firebase 🔥
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {userImageUpload, userTakePhoto} from '@Firebase/firebaseStorage';
import {getCurrentUser} from '@Firebase/firebaseApi';

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
        lofftId: action.payload.lofftId,
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
    const response = await signupFirebase({email, password});
  };

const signin =
  dispatch =>
  async ({email, password}) => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        const uid = response.user.uid;
        dispatch({
          type: 'signin',
          payload: {
            uid,
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
    });
};

const updateProfile = dispatch => () => {};

const uploadUserImage = dispatch => () => {
  userImageUpload().then(response => {
    if (response) {
      dispatch({type: 'update_profile_image', payload: response});
    }
  });
};

const photoUserImage = dispatch => async () => {
  await userTakePhoto().then(response => {
    if (response) {
      dispatch({type: 'update_profile_image', payload: response});
    }
  });
};

const signout = dispatch => async () => {
  dispatch({
    type: 'signout',
    payload: 'You have succesfully signed out 😥',
  });
  auth().signOut();
};

// If signed in but no active user in context then this is requested
const activeUser = dispatch => async () => {
  const response = await getCurrentUser();
  dispatch({
    type: 'signin',
    payload: {
      uid: response.uid,
      name: response.displayName,
      imageURI: response.photoURL,
    },
  });
  // dispatch({type: 'signin', payload: userToken});
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
    photoUserImage,
    activeUser,
    resetMessages,
  },
  {token: null, errorMessage: '', userMessage: ''},
);
