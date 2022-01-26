// import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';
// import {utils} from '@react-native-firebase/app';
// import storage from '@react-native-firebase/storage';
// import {launchImageLibrary} from 'react-native-image-picker';

// if (__DEV__) {
//   console.log('Development Environment');
//   auth().useEmulator('http://localhost:9099');
//   firestore().useEmulator('localhost', 8080);
//   storage().useEmulator('localhost', 9199);
// }

// export const userImageUpload = async () => {
//   console.log('Image Upload Start');
//   const result = await launchImageLibrary({mediaType: 'photo'});
//   console.log(result);
//   console.log(result.assets[0].uri);
//   const reference = storage().ref('/userImage/profile.jpg');
//   const pathToFile = `${utils.FilePath.TEMP_DIRECTORY}/${result.assets[0].fileName}`;
//   console.log(`Reference: ${reference}`);
//   console.log(`Path: ${pathToFile}`);
//   // Upload file
//   await reference.putFile(pathToFile);
//   console.log('Image upload complete');
// };
