import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Platform, ImageBackground} from 'react-native';

// Components
import HeaderBar from '../../components/HeaderBar';

// Stylesheets
import color from './../../assets/defaultColorPallet.json';
import {CoreStyleSheet} from '../../StyleSheets/CoreDesignStyleSheet';
import {fontStyles} from './../../StyleSheets/FontStyleSheet';
import paymentContainerBackground from './../../assets/paymentContainer.png';
import {CoreButton} from '../../components/CoreButton';
import {navigationRef as navigation} from '../../RootNavigation';
import {getLofft, userDetailsUpdate} from '../../api/firebase/fireStoreActions';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const CostsScreen = () => {
  const [lofft, setLofft] = useState(false);
  const [name, setName] = useState('');
  const [image, setImage]: any = useState('');
  const [docId, setDocId]: any = useState('');
  useEffect(() => {
    auth().onAuthStateChanged(user => {
      if (user) {
        const subscriber = firestore()
          .collection('Users')
          .where('uid', '==', user.uid)
          .onSnapshot(snapShot => {
            setDocId(snapShot.docs[0].id);
            const result = snapShot.docs[0].data();
            if (result.name) setName(result.name.split(' ')[0]);
            if (result.imageURI) setImage({uri: result.imageURI});
            if (result.lofft) setLofft(result.lofft);
          });
        return () => subscriber();
      } else {
        console.log('Unauth');
      }
    });
  }, []);

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
          style={styles.pendingPaymentContainer}
          source={paymentContainerBackground}>
          <Text style={fontStyles.buttonTextMedium}>{lofft.name}</Text>
          <View style={styles.buttonContainer}>
            <CoreButton value="Join" style={styles.buttons} />
            <CoreButton
              value="Create"
              style={[styles.buttons, styles.mintButton]}
              onPress={() => {
                navigation.navigate('AddApartment');
              }}
            />
          </View>
        </ImageBackground>
      ) : (
        <ImageBackground
          style={styles.pendingPaymentContainer}
          source={paymentContainerBackground}>
          <Text style={fontStyles.buttonTextMedium}>
            You do not currently have a Lofft
          </Text>
          <View style={styles.buttonContainer}>
            <CoreButton value="Join" style={styles.buttons} />
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
  pendingPaymentContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 172,
    width: '100%',
    marginVertical: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: color.White[0],
    overflow: 'hidden',
    borderRadius: 16,
  },
});

export default CostsScreen;
