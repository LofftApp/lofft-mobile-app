import firestore from '@react-native-firebase/firestore';
import {getCurrentUser} from './firebaseApi';
import {authUserWithEmailAndPassword} from './firebaseApi';

if (__DEV__) {
  console.log('FireStore Development Environment');
  firestore().useEmulator('192.168.0.123', 8080);
}

// Update and edit user profiles.
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
  const currentUser: any = await getCurrentUser().uid;
  let details: any = {name: undefined, pronouns: undefined, email: undefined};
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
  const currentUser: any = await getCurrentUser();
  await authUserWithEmailAndPassword(currentUser.email, password);
  firestore()
    .collection('users')
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
  firestore().collection('users').doc(currentUser.uid).update({imageURI: url});
};

// Update and create Lofft Spaces
export const createLofft = async ({name, description}) => {
  const currentUser: any = await getCurrentUser().uid;
  await firestore()
    .collection('Loffts')
    .add({name, description})
    .then(async response => {
      await firestore()
        .collection('users')
        .doc(currentUser)
        .update({lofft: response.id});
    });
};

export const getLofft = async () => {
  const currentUser: any = await getCurrentUser();
  let result = false;
  await firestore()
    .collection('users')
    .doc(currentUser.uid)
    .get()
    .then(async response => {
      if (response.data().lofft) {
        await firestore()
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
  await firestore()
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
