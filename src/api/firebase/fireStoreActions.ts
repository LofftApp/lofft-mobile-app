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
    .add({
      name,
      description,
      users: [auth().currentUser.uid],
      lead_tenant: [auth().currentUser.uid],
      pending_users: [],
    })
    .then(async response => {
      await firestore()
        .collection('Users')
        .doc(docId)
        .update({lofft: {lofftId: response.id, name, description}});
    });
};

// Find a loft space through search
export const findLofft = async param => {
  const result = await firestore().collection('Loffts').doc(param).get();
  if (result.exists) {
    return result;
  } else {
    const nameSearch = await firestore()
      .collection('Loffts')
      .where('name', '==', param)
      .get();

    return nameSearch.docs.length > 0 ? nameSearch.docs[0] : false;
  }
};

// Join a lofft from Search
export const joinLofft = async lofftId => {
  const currentUser = auth().currentUser;
  const user = await getCurrentUserDetails(currentUser);
  const lofftRoute = await firestore().collection('Loffts').doc(lofftId);
  const lofft = (await lofftRoute.get()).data();
  lofftRoute.update({
    pendingUsers: firestore.FieldValue.arrayUnion(user.docId),
  });
  await firestore()
    .collection('Users')
    .doc(user.docId)
    .update({
      lofft: {
        lofftId,
        name: lofft.name,
        description: lofft.description,
        pending: true,
      },
    });
  return true;
};

export const findTenants = async users => {
  users.map(async user => {
    const response = await firestore().collection('Users').doc(user).get();
    response.data();
  });
};

// Confirm new member
export const confirmUserLofft = (userId, lofftId) => {
  console.log(`user: ${userId}, lofft: ${lofftId}`);
  firestore().collection('Users').doc(userId).update({'lofft.pending': false});
  const lofft = firestore().collection('Loffts').doc(lofftId);
  lofft.update({users: firestore.FieldValue.arrayUnion(userId)});
  lofft.update({pendingUsers: firestore.FieldValue.arrayRemove(userId)});
};

// Edit lofft details
export const updateLofft = (id, name, description, address) => {
  firestore().collection('Loffts').doc(id).update({name, description, address});
  console.log('Update complete');
};

// Add and edit Bills
export const billQuery = async () => {
  let total = 0;
  let payeeData = [];
  let returnedData = [];
  const user = auth().currentUser;
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
};
