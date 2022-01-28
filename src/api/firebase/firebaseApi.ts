import auth from '@react-native-firebase/auth';
import * as RootNavigation from '../../RootNavigation';

if (__DEV__) {
  console.log('Development Authentication Environment');
  auth().useEmulator('http://localhost:9099');
}

export const emailSignup = ({email, password}) => {
  console.log(`I am pushed Firebase - ${email} - ${password}`);
  auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      console.log('User account created & signed in!');

      RootNavigation.navigate('Costs', {});
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

export const emailSignin = ({email, password}) => {
  console.log(`I am pushed Firebase - ${email} - ${password}`);
  auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      RootNavigation.navigate('Costs', {});
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

export const signout = () => {
  auth().signOut();
  console.log('User has been signed out');
};
