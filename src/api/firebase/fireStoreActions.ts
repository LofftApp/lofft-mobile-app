import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {getCurrentUser} from './firebaseApi';

export const userDetailsUpdate = () => {
  auth().onAuthStateChanged(user => {
    if (user) {
      firestore()
        .collection('Users')
        .where('uid', '==', user.uid)
        .onSnapshot(snapShot => {
          console.log(snapShot.docs[0].data());
        });
    } else {
      console.log('Unauth');
    }
  });
};

// Update and edit user profiles.

export const getCurrentUserDetails = async user => {
  let details: any = {};
  let docId = '';
  await firestore()
    .collection('Users')
    .where('uid', '==', user.uid)
    .get()
    .then(querySnapShot => {
      docId = querySnapShot.docs[0].id;
      details = querySnapShot.docs[0].data();
    });
  return {docId, details};
};

export const updateUserAccountDetails = async ({
  firstName,
  lastName,
  pronouns,
  email,
  docId,
}) => {
  auth().onAuthStateChanged(user => {
    if (user) {
      firestore()
        .collection('Users')
        .doc(docId)
        .update({
          name: `${firstName} ${lastName}`,
          pronouns,
          email,
        })
        .then(() => {
          user.updateProfile({
            displayName: `${firstName} ${lastName}`,
          });
          user.updateEmail(email);
        });
    }
  });
};

export const uploadImageToUserProfile = (docId, url) => {
  firestore().collection('Users').doc(docId).update({imageURI: url});
};

// Update and create Lofft Spaces
export const createLofft = async ({name, description, docId}) => {
  await firestore()
    .collection('Loffts')
    .add({name, description})
    .then(async response => {
      await firestore()
        .collection('Users')
        .doc(docId)
        .update({lofft: {lofft_id: response.id, name, description}});
    });
};

// Add and edit Bills
export const billQuery = () => {
  auth().onAuthStateChanged(async user => {
    if (user) {
      let total = 0;
      let payeeData = [];
      let returnedData = [];
      await firestore()
        .collection('Bills')
        .get()
        .then(async querySnapshot => {
          await querySnapshot.forEach(documentSnapShot => {
            payeeData.push(documentSnapShot.data());
          });
          payeeData.forEach(userBill => {
            if (userBill.payees[user.uid] && !userBill.payees[user.uid].paid) {
              total += userBill.payees[user.uid].value;
              returnedData.push(userBill);
            }
          });
        });
      return {total, returnedData};
    }
  });
};
