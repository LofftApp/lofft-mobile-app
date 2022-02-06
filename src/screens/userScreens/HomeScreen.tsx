import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Platform, ImageBackground} from 'react-native';

// Components
import HeaderBar from '../../components/HeaderBar';

// Stylesheets
import color from '../../assets/defaultColorPallet.json';
import {CoreStyleSheet} from '../../StyleSheets/CoreDesignStyleSheet';
import {fontStyles} from '../../StyleSheets/FontStyleSheet';
import paymentContainerBackground from './../../assets/paymentContainer.png';
import {CoreButton} from '../../components/CoreButton';
import {navigationRef as navigation} from '../../RootNavigation';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const HomeScreen = () => {
  const [lofft, setLofft]: any = useState(false);
  const [name, setName] = useState('');
  const [image, setImage]: any = useState('');
  const [docId, setDocId]: any = useState('');
  useEffect(() => {
    const unsubscribe = firestore()
      .collection('Users')
      .where('uid', '==', auth().currentUser.uid)
      .onSnapshot(snapShot => {
        setDocId(snapShot.docs[0].id);
        const result = snapShot.docs[0].data();
        if (result.name) setName(result.name.split(' ')[0]);
        if (result.imageURI) setImage({uri: result.imageURI});
        if (result.lofft) setLofft(result.lofft);
      });
    return () => unsubscribe();
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
          style={[styles.apartmentContainer, styles.apartmentPresent]}
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
              <CoreButton value="Manage" style={styles.buttons} />
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
    width: '100%',
    marginVertical: 16,
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
});

export default HomeScreen;
