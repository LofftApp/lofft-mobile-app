import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import color from './../assets/defaultColorPallet.json';
import {CoreButton} from '../components/CoreButton';
import HomeCarosel from '../components/HomeCarosel';
import PaginationBar from '../components/PaginationBar';
// import {credentials} from './../api/Auth0/authCredentials';

// Auth
// import Auth0 from 'react-native-auth0';
// const auth0 = new Auth0(credentials);

// const authSignup = () => {
//   auth0.webAuth
//     .authorize({
//       scope: 'openid profile email',
//     })
//     .then(credentials => {
//       const token = credentials.accessToken;
//       console.log(credentials);
//     });
// };

const HomeScreen = ({navigation}: any) => {
  const [screen, setScreen] = useState(0);
  const activeScreen = (data: any) => {
    setScreen(data);
  };
  let bgColor = color.Mint[10];
  switch (screen) {
    case 0:
      bgColor = color.Mint[10];
      break;
    case 1:
      bgColor = color.Gold[10];
      break;
    case 2:
      bgColor = color.Lavendar[10];
      break;
    case 3:
      bgColor = color.Blue[10];
      break;
    default:
      bgColor = color.White[100];
  }
  return (
    <View style={[styles.mainContainerStyle, {backgroundColor: bgColor}]}>
      <View style={styles.carouselContainer}>
        <HomeCarosel activeScreen={activeScreen} />
        <PaginationBar screen={screen} />
      </View>
      <View style={styles.buttonContainer}>
        <CoreButton
          value="Sign in"
          invert={true}
          userStyle={{width: '45%'}}
          onPress={() => navigation.navigate('Signin')}
        />
        <CoreButton
          value="Sign up"
          userStyle={{width: '45%'}}
          onPress={() => navigation.navigate('Signup')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainerStyle: {
    flex: 1,
    justifyContent: 'space-between',
    height: '100%',
    paddingBottom: 55,
  },
  carouselContainer: {
    flex: 1,
    paddingBottom: 25,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-evenly',
  },
});

export default HomeScreen;
