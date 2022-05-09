import createDataContext from './createDataContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RootNavigation from '../RootNavigation';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return;
    case 'signin':
      return;
    case 'signout':
      return;
    default:
      return state;
  }
};

const signup = async ({email, password}) => {
  console.log(email, password);
};

const signin = () => {};

const signout = () => {};

const activeUser = () => {};

export const {Provider, Context} = createDataContext(
  authReducer,
  {signin, signout, signup, activeUser},
  {token: null, errorMessage: ''},
);
