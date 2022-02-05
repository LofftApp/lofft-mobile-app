import createDataContext from './createDataContext';
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
    try {
      await auth()
        .createUserWithEmailAndPassword(email, password)
        .then(async response => {
          await firestore()
            .collection('Users')
            .doc(response.user.uid)
            .set({email});
        });
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        dispatch({
          type: 'add_error',
          payload: 'This e-mail is already registered',
        });
      }
      if (error.code === 'auth/invalid-email') {
        dispatch({
          type: 'add_error',
          payload: 'Please use a valid e-mail',
        });
      }
    }
  };

const signin =
  dispatch =>
  async ({email, password}) => {
    try {
      auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        dispatch({
          type: 'add_error',
          payload: 'This e-mail is already registered',
        });
      }
      if (error.code === 'auth/invalid-email') {
        dispatch({
          type: 'add_error',
          payload: 'Please use a valid e-mail',
        });
      }
    }
  };

const signout = dispatch => async () => {
  auth().signOut();
  dispatch({type: 'signout'});
};

export const {Provider, Context} = createDataContext(
  authReducer,
  {signin, signout, signup},
  {token: null, errorMessage: ''},
);
