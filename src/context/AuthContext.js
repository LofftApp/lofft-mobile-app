import createDataContext from './createDataContext';
import lofftApi from '../api/lofftApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RootNavigation from '../RootNavigation';

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
      const response = await lofftApi.post('/api/signup', {
        headers: {
          'Content-Type': 'application/json',
        },
        user: {
          email,
          password,
        },
      });
      await AsyncStorage.setItem('token', response.headers.authorization);
      dispatch({type: 'signin', payload: response.headers.authorization});
      RootNavigation.navigate('UserComponents', {screen: 'Account'});
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'add_error',
        payload: 'Something has gone wrong during signup',
      });
    }
  };

const signin =
  dispatch =>
  async ({email, password}) => {
    console.log('I am called');
    try {
      const response = await lofftApi.post('/api/signin', {
        headers: {
          'Content-Type': 'application/json',
        },
        user: {
          email,
          password,
        },
      });

      const token = await response.headers.authorization.split(' ')[1];
      await AsyncStorage.setItem('token', token);

      dispatch({type: 'signin', payload: response.headers.authorization});
      RootNavigation.navigate('UserComponents', {screen: 'Account'});
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'add_error',
        payload: 'Something has gone wrong during signin',
      });
    }
  };

const signout = dispatch => async () => {
  await AsyncStorage.removeItem('token');
  dispatch({type: 'signout'});
  RootNavigation.navigate('Home');
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

export const {Provider, Context} = createDataContext(
  authReducer,
  {signin, signout, signup, activeUser},
  {token: null, errorMessage: ''},
);
