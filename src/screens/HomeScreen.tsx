import React, {useState, useEffect, useContext} from 'react';
import {View, Text, StyleSheet, Modal} from 'react-native';
import color from './../assets/defaultColorPallet.json';
import {CoreButton} from '../components/buttons/CoreButton';
import HomeCarosel from '../components/bannersAndBars/HomeCarosel';
import PaginationBar from '../components/bannersAndBars/PaginationBar';
import {Context as UserDetails} from '../context/UserDetailsContext';

const HomeScreen = ({navigation}: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [screen, setScreen] = useState(0);
  const activeScreen = (data: any) => {
    setScreen(data);
  };
  const {state, resetMessages} = useContext(UserDetails);
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
  useEffect(() => {
    console.log(state);
    if (state.userMessage) {
      setModalVisible(true);
    }
  }, []);
  return (
    <View style={[styles.mainContainerStyle, {backgroundColor: bgColor}]}>
      <Modal
        transparent={true}
        animationType="fade"
        visible={modalVisible}
        onShow={() => {
          setTimeout(() => {
            resetMessages();
            setModalVisible(false);
          }, 2000);
        }}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>{state.userMessage}</Text>
        </View>
      </Modal>
      <View style={styles.carouselContainer}>
        <HomeCarosel activeScreen={activeScreen} />
        <PaginationBar screen={screen} />
      </View>
      <View style={styles.buttonContainer}>
        <CoreButton
          value="Sign in"
          invert={true}
          style={styles.button}
          onPress={() => navigation.navigate('Signin')}
        />
        <CoreButton
          value="Sign up"
          style={styles.button}
          onPress={() => navigation.navigate('Signup')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: color.Mint[100],
    color: color.Black[100],
    height: 35,
    borderRadius: 4,
    justifyContent: 'center',
    paddingHorizontal: 5,
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
  },
  modalText: {
    color: color.Black[100],
  },
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
  button: {
    width: '45%',
  },
});

export default HomeScreen;
