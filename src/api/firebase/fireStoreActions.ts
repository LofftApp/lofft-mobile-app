import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {dateStringFormatter} from '../../components/HelperFunctions/dateFormatter';

// Contents
// 1.0 User
//  1.1 Get user data
//  1.2 Get user loffId
// 2.0 Lofft

export const userDetailsUpdate = () => {
  auth().onAuthStateChanged(user => {
    if (user) {
      firestore()
        .collection('Users')
        .where('uid', '==', user.uid)
        .onSnapshot(snapShot => {
          snapShot.docs[0].data();
        });
    } else {
      console.log('Unauth');
    }
  });
};

// 1.0 User
// =========================================================

// 1.1 Get user data
export const getCurrentUserDetails = async userID => {
  const userDetails = await firestore().collection('Users').doc(userID).get();
  return userDetails.data();
};

// 1.2 Get user Lofft ID
export const getUserLofft = async () => {
  const currentUser = auth().currentUser;
  if (currentUser) {
    const user = await getCurrentUserDetails(currentUser.uid);
    if (user && user.lofft) return user.lofft;
  }
  return null;
};

// Edit user profiles
export const updateUser = (
  docId,
  name = null,
  description = '',
  hobbiesAndValues = {},
) => {
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

export const uploadLibraryImagesToUserProfile = ({
  targetId,
  urls,
  targetDB = 'Users',
}) => {
  firestore()
    .collection(targetDB)
    .doc(targetId)
    .update({libraryURIS: firestore.FieldValue.arrayUnion(...urls)});
};

export const deleteImageFromImageLibraryRef = (docId, url) => {
  firestore()
    .collection('Users')
    .doc(docId)
    .update({libraryURIS: firestore.FieldValue.arrayRemove(url)});
};

// Update and create Lofft Spaces
export const createLofft = async ({
  name,
  description,
  userID,
  hobbiesAndValues,
}) => {
  await firestore()
    .collection('Loffts')
    .add({
      name,
      description,
      users: [{user_id: auth().currentUser.uid, admin: true}],
      pendingUsers: [],
      hobbiesAndValues,
      emoji: '🤷',
    })
    .then(async response => {
      await firestore()
        .collection('Users')
        .doc(userID)
        .update({lofft: response.id});
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
  const currentUser = auth().currentUser.uid;
  const lofftRoute = await firestore().collection('Loffts').doc(lofftId);
  lofftRoute.update({
    pendingUsers: firestore.FieldValue.arrayUnion(currentUser),
  });
  await firestore().collection('Users').doc(currentUser).update({
    lofft: lofftId,
    lofftPending: true,
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
export const updateLofft = (id, name, description, address, emoji, values) => {
  firestore()
    .collection('Loffts')
    .doc(id)
    .update({name, description, address, emoji, hobbiesAndValues: values});
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
  eventName,
  location,
  date,
  fromTime,
  untilTime,
  description,
) => {
  const currentUser = auth().currentUser;
  const user = await getCurrentUserDetails(currentUser?.uid);
  const lofftId = user?.lofft;
  // const selectedFriendsOnly = inputFriends.filter(el => el.selected === true);

  let event = {
    title: eventName,
    location: location,
    date: date,
    from: fromTime,
    till: untilTime,
    description: description,
    attending: [],
    notAttending: [],
    active: true,
    createdBy: currentUser?.uid,
    updatedAt: new Date(),
    createdAt: new Date(),
  };

  firestore()
    .collection('Managements')
    .doc(lofftId)
    .collection('Events')
    .add(event);
};

export const getLofftEvents = async () => {
  const currentUser = auth().currentUser;
  const user = await getCurrentUserDetails(currentUser?.uid);
  const lofftId = user.lofft;
  console.log(lofftId);
  let date = new Date();
  date = new Date(dateStringFormatter(date));
  const firstMonth = new Date(date.getFullYear(), date.getMonth(), 2);
  const result = await firestore()
    .collection('Managements')
    .doc(lofftId)
    .collection('Events')
    .where('date', '>=', firstMonth)
    .get()
    .then(docSnapshot => {
      return docSnapshot.docs;
    });
  return result;
};

export const attendLofftEvent = async e => {
  const currentUser = auth().currentUser;
  const user = await getCurrentUserDetails(currentUser);
  const loftId = user.details.lofft.lofftId;
  await firestore()
    .collection('Managements')
    .doc(loftId)
    .collection('Events')
    .doc(e)
    .update({
      attending: firestore.FieldValue.arrayUnion(currentUser.uid),
      updatedAt: new Date(),
    });
};

export const rejectLofftEvent = async e => {
  const currentUser = auth().currentUser;
  const user = await getCurrentUserDetails(currentUser);
  const loftId = user.details.lofft.lofftId;
  await firestore()
    .collection('Managements')
    .doc(loftId)
    .collection('Events')
    .doc(e)
    .update({
      notAttending: firestore.FieldValue.arrayUnion(currentUser.uid),
      updatedAt: new Date(),
    });
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
    .update({
      active: false,
      updatedAt: new Date(),
    });
};

// Create Poll

export const addPoll = async (question, answers, deadline) => {
  const lofftId = await getUserLofft();

  const poll = {
    createdByID: auth().currentUser.uid,
    question: question,
    answers: answers.current,
    deadline: deadline,
    userInput: {},
  };

  await firestore()
    .collection('Managements')
    .doc(lofftId)
    .collection('Polls')
    .add(poll);
};

// Pull Lofft Poll from DB

export const getLofftPolls = async () => {
  const lofftId = await getUserLofft();
  if (lofftId) {
    const polls = await firestore()
      .collection('Managements')
      .doc(lofftId)
      .collection('Polls')
      .get()
      .then(docSnapshot => {
        return docSnapshot.docs;
      });
    if (polls.length > 0) return {polls, lofftId};
  }
  return {polls: null, lofftId};
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
  console.log(`Poll Id: ${pollId} - Answer: ${answer}`);
  const user = auth().currentUser;
  const userID = user?.uid;
  const userDetails = await getCurrentUserDetails(userID);
  const lofftId = userDetails?.lofft;

  firestore()
    .collection('Managements')
    .doc(lofftId)
    .collection('Polls')
    .doc(pollId)
    .update({[`userInput.${userID}`]: answer});
};
