import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import getAuth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import * as RootNavigation from '../../RootNavigation';

if (__DEV__) {
  console.log('Development Environment');
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
  let payeeData = [];
  let returnedData = [];
  await firestore()
    .collection('bills')
    .get()
    .then(async querySnapshot => {
      await querySnapshot.forEach(documentSnapShot => {
        payeeData.push(documentSnapShot.data());
      });
      payeeData.forEach(userBill => {
        if (
          userBill.payees[current_user] &&
          !userBill.payees[current_user].paid
        ) {
          total += userBill.payees[current_user].value;
          returnedData.push(userBill);
        }
      });
    });
  return {total, returnedData};
};

export const getUser = async userID => {
  let name: any;
  await firestore()
    .collection('users')
    .doc(userID)
    .get()
    .then(async querySnapshot => {
      name = querySnapshot.data();
    });
  return name;
};
