import React, {useState, useEffect, useContext} from 'react';
import {View, Text, StyleSheet, Platform, ImageBackground} from 'react-native';
import {navigationRef as navigation} from '../../RootNavigation';
import {Context as UserDetails} from '../../context/UserDetailsContext';

// Components
import HeaderBar from '../../components/bannersAndBars/HeaderBar';
import ActionButton from '../../components/buttons/ActionButton';
import {CoreButton} from '../../components/buttons/CoreButton';

// Assets
import sendButtonBackground from './../../assets/sendButtonBackground.png';
import requestButtonBackground from './../../assets/requestButtonBackground.png';
import paymentContainerBackground from './../../assets/paymentContainer.png';

// Stylesheets
import color from '../../assets/defaultColorPallet.json';
import {CoreStyleSheet} from '../../StyleSheets/CoreDesignStyleSheet';
import {fontStyles} from '../../StyleSheets/FontStyleSheet';

// Firebase
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const HomeScreen = () => {
  const [lofft, setLofft]: any = useState(false);
  const [name, setName] = useState('');
  const [image, setImage]: any = useState('');
  const [docId, setDocId]: any = useState('');
  const {state, activeUser} = useContext(UserDetails);
  useEffect(() => {
    if (state.uid) {
      if (state.name) setName(state.name.split(' ')[0]);
      if (state.imageURI) setImage({uri: state.imageURI});
      const unsubscribe = firestore()
        .collection('Users')
        .doc(state.uid)
        .onSnapshot(snapShot => {
          setDocId(snapShot.data().id);
          const result = snapShot.data();
          if (result.lofft) setLofft(result.lofft);
        });
      return () => unsubscribe();
    } else {
      activeUser();
    }
  }, [state]);
  return (
    <View
      style={[
        CoreStyleSheet.viewContainerStyle,
        Platform.OS === 'ios' ? CoreStyleSheet.viewContainerIOSStyle : null,
        styles.container,
      ]}>
      <HeaderBar title={name ? `Hello ${name}` : 'Welcome'} image={image} />
      {lofft ? (
        <ImageBackground
          style={[
            styles.apartmentContainer,
            styles.apartmentPresent,
            {width: '100%'},
          ]}
          source={paymentContainerBackground}>
          <View style={styles.apartmentNameBar}>
            <Text style={fontStyles.buttonTextMedium}>{lofft.name}</Text>
            {lofft.pending ? (
              <View style={styles.statusButton}>
                <Text style={[fontStyles.buttonTextSmall, styles.pendingText]}>
                  Pending
                </Text>
              </View>
            ) : null}
          </View>
          <View style={styles.buttonContainer}>
            {lofft.pending ? (
              <Text style={fontStyles.buttonTextSmall}>
                Your request to join a lofft is pending
              </Text>
            ) : (
              <CoreButton
                value="View"
                style={styles.buttons}
                onPress={() =>
                  navigation.navigate('LofftProfile', {lofft: lofft.lofftId})
                }
              />
            )}
          </View>
        </ImageBackground>
      ) : (
        <ImageBackground
          style={styles.apartmentContainer}
          source={paymentContainerBackground}>
          <Text style={fontStyles.buttonTextMedium}>
            You do not currently have a Lofft
          </Text>
          <View style={styles.buttonContainer}>
            <CoreButton
              value="Join"
              style={styles.buttons}
              onPress={() => navigation.navigate('JoinApartment')}
            />
            <CoreButton
              value="Create"
              style={[styles.buttons, styles.mintButton]}
              onPress={() => {
                navigation.navigate('AddApartment', {docId});
              }}
            />
          </View>
        </ImageBackground>
      )}
      <View style={styles.actionButtonContainer}>
        <ActionButton
          text="Find"
          backgroundImage={sendButtonBackground}
          iconName="search-outline"
          buttonColor={color.Mint[100]}
        />
        <ActionButton
          text="Manage"
          backgroundImage={requestButtonBackground}
          iconName="flask-outline"
          buttonColor={color.Gold[100]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttons: {
    width: 150,
  },
  mintButton: {
    backgroundColor: color.Mint[100],
    borderColor: color.Mint[100],
  },
  apartmentContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 172,
    marginTop: 16,
    marginBottom: 10,
    padding: 16,
    borderWidth: 1,
    borderColor: color.White[0],
    overflow: 'hidden',
    borderRadius: 16,
  },
  apartmentNameBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  apartmentPresent: {
    alignItems: 'flex-start',
  },
  statusButton: {
    borderWidth: 2,
    borderColor: color.Mint[50],
    borderRadius: 4,
    padding: 3,
    backgroundColor: color.Mint[50],
  },
  pendingText: {color: color.White[80]},
  actionButtonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default HomeScreen;
