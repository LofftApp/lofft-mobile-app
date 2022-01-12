import auth from '@react-native-firebase/auth';
import * as RootNavigation from '../../RootNavigation';

export const emailSignIn = ({email, password}) => {
  console.log(`I am pushed Firebase - ${email} - ${password}`);
  auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      console.log('User account created & signed in!');
      RootNavigation.navigate('Costs');
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }

      console.error(error);
    });
};
