import React, {useState, useEffect, useContext} from 'react';
import {View, Text, StyleSheet, Platform, ImageBackground} from 'react-native';
import {navigationRef as navigation} from '../../RootNavigation';
import {Context as UserDetails} from '../../context/UserDetailsContext';

// Components
import HeaderBar from '../../components/bannersAndBars/HeaderBar';
import ActionButton from '../../components/buttons/ActionButton';
import {CoreButton} from '../../components/buttons/CoreButton';
import LofftDetailsCard from '../../components/cards/LofftDetailsCard';

// Assets
import sendButtonBackground from './../../assets/sendButtonBackground.png';
import requestButtonBackground from './../../assets/requestButtonBackground.png';
import paymentContainerBackground from './../../assets/paymentContainer.png';

// Stylesheets
import color from '../../assets/defaultColorPallet.json';
import {CoreStyleSheet} from '../../StyleSheets/CoreDesignStyleSheet';
import {fontStyles} from '../../StyleSheets/FontStyleSheet';

// Firebase 🔥
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const HomeScreen = () => {
  const [lofft, setLofft]: any = useState(false);
  const [pending, setPending] = useState(false);
  const [name, setName] = useState('');
  const [image, setImage]: any = useState('');
  const [docId, setDocId]: any = useState('');
  const [lofftName, setLofftName] = useState(null);
  const {state, activeUser} = useContext(UserDetails);

  useEffect(() => {
    console.log(state);
    if (state.uid) {
      if (state.name) setName(state.name.split(' ')[0]);
      if (state.imageURI) setImage({uri: state.imageURI});
      const unsubscribe = firestore()
        .collection('Users')
        .doc(state.uid)
        .onSnapshot(snapShot => {
          setDocId(snapShot.data().id);
          const result = snapShot.data();
          if (result && result.lofftPending) setPending(result.lofftPending);
          if (result && result.lofft) {
            setLofft(result.lofft);
            firestore()
              .collection('Loffts')
              .doc(result.lofft)
              .get()
              .then(r => {
                const data = r.data();
                setLofftName(data?.name);
              });
          }
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
      <LofftDetailsCard
        lofftId={lofft}
        lofftName={lofftName ? lofftName : 'You do not currently have a Lofft'}
        pending={pending}
      />
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
    height: 172,
    marginTop: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: color.White[0],
    overflow: 'hidden',
    borderRadius: 16,
  },
  lofftDetailsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    display: 'flex',
  },
  apartmentPresent: {
    // alignItems: 'flex-start',
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
