import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

if (__DEV__) {
  console.log('FireStore Development Environment');
  auth().useEmulator('http://localhost:9099');
  firestore().useEmulator('localhost', 8080);
}

export const billQuery = async () => {
  const current_user: any = await auth().currentUser.uid;
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
  const currentUser: any = await auth().currentUser.uid;
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
  const currentUserDetails: any = await auth().currentUser;
  auth()
    .signInWithEmailAndPassword(currentUserDetails.email, password)
    .then(() => {
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
    })
    .catch(e => {
      console.log(e.code);
      return e;
    });
};

export const createLofft = async ({name, description}) => {
  console.log(`Name: ${name} - Description: ${description}`);
  await firestore()
    .collection('Appartments')
    .add({name, description})
    .then(() => console.log('added'));
};
