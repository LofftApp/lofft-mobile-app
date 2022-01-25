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

export const getCurrentUserDetails = async () => {
  const currentUser: any = await getAuth().currentUser.uid;
  let details = {name: undefined, pronouns: undefined, email: undefined};
  await firestore()
    .collection('users')
    .doc(currentUser)
    .get()
    .then(async querySnapShot => {
      details = querySnapShot.data();
    });
  return details;
};

export const updateUserAccountDetails = async ({
  firstName,
  lastName,
  pronouns,
  email,
  password,
}) => {
  const currentUserDetails: any = await getAuth().currentUser;
  if (currentUserDetails.email === email) {
    firestore()
      .collection('users')
      .doc(currentUserDetails.uid)
      .update({
        name: `${firstName} ${lastName}`,
        pronouns,
        email,
      })
      .then(() => {
        auth().currentUser.updateProfile({
          displayName: `${firstName} ${lastName}`,
        });
        auth().currentUser.updateEmail(email);
      });
  } else {
    return {message: 'Incorrect Password'};
  }
};
