import firestore from '@react-native-firebase/firestore';
import {getCurrentUser} from './firebaseApi';
import {authUserWithEmailAndPassword} from './firebaseApi';
import auth from '@react-native-firebase/auth';

const db = firestore();

if (__DEV__) {
  console.log('FireStore Development Environment');
  auth().useEmulator('http://192.168.0.123:9099');
  db.useEmulator('192.168.0.123', 8080);
}

// General Listern for user profile update.

export const userDetailsUpdate = userID => {
  return db
    .collection('Users')
    .where('uid', '==', userID.uid)
    .onSnapshot(querySnapShot => {
      querySnapShot.docs[0].data();
    });
};

// Update and edit user profiles.
export const getUser = async userID => {
  let name: any;
  await db
    .collection('Users')
    .where('uid', '==', userID)
    .get()
    .then(async querySnapshot => {
      querySnapshot;
    });
  return name;
};

export const getCurrentUserDetails = async () => {
  const currentUser: any = await getCurrentUser().uid;
  let details: any = {name: undefined, pronouns: undefined, email: undefined};
  await db
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
  const currentUser: any = await getCurrentUser();
  await authUserWithEmailAndPassword(currentUser.email, password);
  db.collection('users')
    .doc(currentUser.uid)
    .update({
      name: `${firstName} ${lastName}`,
      pronouns,
      email,
    })
    .then(() => {
      currentUser.updateProfile({
        displayName: `${firstName} ${lastName}`,
      });
      currentUser.updateEmail(email);
    });
};

export const uploadImageToUserProfile = async url => {
  const currentUser: any = await getCurrentUser();
  db.collection('users').doc(currentUser.uid).update({imageURI: url});
};

export const getUserImage = async userID => {
  firestore()
    .collection('users')
    .doc(userID)
    .onSnapshot(documentSnapshot => {
      return documentSnapshot.data().imageURI;
    });
};

// Update and create Lofft Spaces
export const createLofft = async ({name, description}) => {
  const currentUser: any = await getCurrentUser().uid;
  await db
    .collection('Loffts')
    .add({name, description})
    .then(async response => {
      await db
        .collection('users')
        .doc(currentUser)
        .update({lofft: response.id});
    });
};

export const getLofft = async () => {
  const currentUser: any = await getCurrentUser();
  let result = false;
  await db
    .collection('users')
    .doc(currentUser.uid)
    .get()
    .then(async response => {
      if (response.data().lofft) {
        await db
          .collection('Loffts')
          .doc(response.data().lofft)
          .get()
          .then(lofftResponse => {
            result = lofftResponse.data();
          });
      }
    });
  return result;
};

// Add and edit Bills
export const billQuery = async () => {
  const currentUser: any = await getCurrentUser();
  let total = 0;
  let payeeData = [];
  let returnedData = [];
  await db
    .collection('bills')
    .get()
    .then(async querySnapshot => {
      await querySnapshot.forEach(documentSnapShot => {
        payeeData.push(documentSnapShot.data());
      });
      payeeData.forEach(userBill => {
        if (
          userBill.payees[currentUser.uid] &&
          !userBill.payees[currentUser.uid].paid
        ) {
          total += userBill.payees[currentUser.uid].value;
          returnedData.push(userBill);
        }
      });
    });
  return {total, returnedData};
};
