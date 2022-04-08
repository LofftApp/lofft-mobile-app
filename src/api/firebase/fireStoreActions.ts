import firestore, {doc, getDoc, setDoc} from '@react-native-firebase/firestore';
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
      users: [{user_id: auth().currentUser.uid, admin: true}],
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

// Create Event
export const addEvent = async (
  title,
  location,
  date,
  from,
  till,
  sharewithFlatmates,
  description,
  inputFriends,
) => {
  const currentUser = auth().currentUser;
  const user = await getCurrentUserDetails(currentUser);
  const loftId = user.details.lofft.lofftId;
  const selectedFriendsOnly = inputFriends.filter(el => el.selected === true);

  let currentEvent = {
    title: title,
    location: location,
    date: date,
    from: from,
    till: till,
    sharewithFlatmates: sharewithFlatmates,
    description: description,
    selectedFriends: selectedFriendsOnly,
  };

  const docRef = await firestore().collection('Managements').doc(loftId);

  docRef.get().then(docSnapshot => {
    if (docSnapshot.exists) {
      docRef.update({
        events: firestore.FieldValue.arrayUnion(currentEvent),
      });
    } else {
      docRef.set({
        // doc Ref creates doc id from Loft id 😎
      });
    }
  });
};

// Create Poll

export const addPoll = async (
  uniqueQuestionId,
  question,
  anwsers,
  deadline,
  multipleAnwser,
) => {
  console.log(uniqueQuestionId);

  const currentUser = auth().currentUser;
  const user = await getCurrentUserDetails(currentUser);
  const loftId = user.details.lofft.lofftId;

  let currentPoll = {
    questionID: uniqueQuestionId,
    question: question,
    anwserOptions: [{displayAnwser: anwsers.current}],
    deadline: deadline,
    multipleAnwser: multipleAnwser,
    userInput: [],
  };

  const docRef = await firestore().collection('Managements').doc(loftId);

  docRef.get().then(docSnapshot => {
    if (docSnapshot.exists) {
      docRef.update({
        Polls: firestore.FieldValue.arrayUnion(currentPoll),
      });
    } else {
      docRef.set({
        // doc Ref creates doc id from Loft id 😎
      });
    }
  });
};

// Pull Managements from DB

export const getMangementData = async () => {
  const currentUser = auth().currentUser;
  const user = await getCurrentUserDetails(currentUser);
  const loftId = user.details.lofft.lofftId;

  const searchDocId = firestore()
    .collection('Managements')
    .doc(loftId)
    .get()
    .then(docSnapshot => {
      if (docSnapshot.exists) {
        return docSnapshot._data;
      } else {
        return [];
      }
    });

  return searchDocId;
};

export const differentApproach = async (questionIdInput) => {
  const currentUser = auth().currentUser;
  const user = await getCurrentUserDetails(currentUser);
  const loftId = user.details.lofft.lofftId;

  const docRef = await firestore().collection('Managements').doc(loftId).collection('Pollsresult').doc(questionId);

  let userAnwser = {
    userId: '123456',
    userAnwser: 'test'
  }

  docRef.get().then(docSnapshot => {
    if (docSnapshot.exists) {
      docRef.update({
        UserInput: firestore.FieldValue.arrayUnion(userAnwser),
      });
    } else {
      docRef.set({
        // doc Ref creates doc id from Loft id 😎
      });
    }


    const findPollResults =  await firestore()
      .collection('Managements')
      .doc(loftId)
      .collection('Pollsresult')
      .where('questionId', '==', questionIdInput)
      .get();

      // Then retrieve data filter the right object change its content store it in the state update the state and send it back the api.

//// 💩 💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩
};
