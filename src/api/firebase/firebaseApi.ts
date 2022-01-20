import auth from '@react-native-firebase/auth';
import getAuth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import * as RootNavigation from '../../RootNavigation';

if (__DEV__) {
  auth().useEmulator('http://localhost:9099');
  firestore().useEmulator('localhost', 8080);
}

export const emailSignup = ({email, password}) => {
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

export const emailSignin = ({email, password}) => {
  console.log(`I am pushed Firebase - ${email} - ${password}`);
  auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
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

export const signout = () => {
  auth().signOut();
  console.log('User has been signed out');
};

export const billQuery = async () => {
  const current_user: any = await getAuth().currentUser.uid;
  let total = 0;
  let payee_data = [];
  await firestore()
    .collection('bills')
    .get()
    .then(async querySnapshot => {
      await querySnapshot.forEach(documentSnapShot => {
        payee_data.push(documentSnapShot.data());
      });
      console.log(current_user);
      payee_data.forEach(userBills => {
        if (userBills.payees[current_user]) {
          total += userBills.payees[current_user].value;
        }
      });
    });
  return total;
};
