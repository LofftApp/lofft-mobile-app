import getAuth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// if (__DEV__) {
//   firestore().useEmulator('localhost', 8080);
// }

// Firestore
export const billQuery = async () => {
  // const current = getAuth().currentUser;
  // console.log(current);
  const users = await firestore().collection('Users').get();
  console.log(users);
  return 0;
};
