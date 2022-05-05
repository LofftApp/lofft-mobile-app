import firestore, {doc, getDoc, setDoc} from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {getCurrentUser} from './firebaseApi';
import values from '../../data/hobbiesAndValues.json';

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

// Edit user profiles
export const updateUser = (
  docId,
  name = null,
  description = '',
  hobbiesAndValues = {},
) => {
  console.log(name);
  auth().onAuthStateChanged(user => {
    firestore()
      .collection('Users')
      .doc(docId)
      .update({
        name,
        // email,
        userProfile: {
          description,
          hobbiesAndValues,
        },
      })
      .then(() => {
        user.updateProfile({
          displayName: name,
        });
      });
  });
};

export const uploadImageToUserProfile = (docId, url) => {
  firestore().collection('Users').doc(docId).update({imageURI: url});
};

// Update and create Lofft Spaces
export const createLofft = async ({
  name,
  description,
  docId,
  hobbiesAndValues,
}) => {
  await firestore()
    .collection('Loffts')
    .add({
      name,
      description,
      users: [{user_id: auth().currentUser.uid, admin: true}],
      pending_users: [],
      hobbiesAndValues,
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
export const updateLofft = (id, name, description, address, values) => {
  firestore()
    .collection('Loffts')
    .doc(id)
    .update({name, description, address, hobbiesAndValues: values});
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

  let event = {
    title: title,
    location: location,
    date: date,
    from: from,
    till: till,
    sharewithFlatmates: sharewithFlatmates,
    description: description,
    invited: selectedFriendsOnly,
    attending: [],
    notAttending: [],
    active: true,
    createdBy: currentUser.uid,
    updatedAt: new Date(),
    createdAt: new Date(),
  };
  console.log(event);

  firestore()
    .collection('Managements')
    .doc(loftId)
    .collection('Events')
    .add(event);
};

export const getLofftEvents = async () => {
  const currentUser = auth().currentUser;
  const user = await getCurrentUserDetails(currentUser);
  const loftId = user.details.lofft.lofftId;
  const date = new Date();
  const firstMonth = new Date(date.getFullYear(), date.getMonth(), 2);
  const result = await firestore()
    .collection('Managements')
    .doc(loftId)
    .collection('Events')
    .where('date', '>=', firstMonth)
    .get()
    .then(docSnapshot => {
      return docSnapshot.docs;
    });
  return result;
};

export const cancelLofftEvent = async e => {
  const currentUser = auth().currentUser;
  const user = await getCurrentUserDetails(currentUser);
  const loftId = user.details.lofft.lofftId;
  await firestore()
    .collection('Managements')
    .doc(loftId)
    .collection('Events')
    .doc(e)
    .update({active: false});
};

// Create Poll

export const addPoll = async (question, anwsers, deadline, multipleAnwser) => {
  const currentUser = auth().currentUser;
  const user = await getCurrentUserDetails(currentUser);
  const loftId = user.details.lofft.lofftId;

  const poll = {
    createdByID: auth().currentUser.uid,
    question: question,
    answers: anwsers.current,
    deadline: deadline,
    multipleAnwser: multipleAnwser,
    userInput: {},
  };

  await firestore()
    .collection('Managements')
    .doc(loftId)
    .collection('Polls')
    .add(poll);
};

// Pull Lofft Poll from DB

export const getLofftPolls = async () => {
  const currentUser = auth().currentUser;
  const user = await getCurrentUserDetails(currentUser);
  const loftId = user.details.lofft.lofftId;

  const result = await firestore()
    .collection('Managements')
    .doc(loftId)
    .collection('Polls')
    .get()
    .then(docSnapshot => {
      return docSnapshot.docs;
    });
  return result;
};

export const getPollsData = async (value, setValue) => {
  setValue([]);
  const result = await getLofftPolls();
  result.forEach(r => {
    setValue(value => [...value, r.data()]);
  });
};

// Vote in a Poll Method
export const votePoll = async (pollId, answer) => {
  // console.log(answer);
  const user = auth().currentUser;
  const userID = user.uid;
  const userDetails = await getCurrentUserDetails(user);
  const lofftId = userDetails.details.lofft.lofftId;
  firestore()
    .collection('Managements')
    .doc(lofftId)
    .collection('Polls')
    .doc(pollId)
    .update({[`userInput.${userID}`]: answer});
};
