import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  ImageBackground,
  TextInput,
} from 'react-native';
import {navigationRef as navigation} from '../../RootNavigation';
import Icon from 'react-native-vector-icons/Ionicons';
import shapesBackground from './../../assets/backgroundShapes/mint.png';

// Firestore
import firestore from '@react-native-firebase/firestore';

// stylesheets
import color from '../../assets/defaultColorPallet.json';
import {CoreStyleSheet} from '../../StyleSheets/CoreDesignStyleSheet';
import {fontStyles} from '../../StyleSheets/FontStyleSheet';

// Components
import CustomBackButton from '../../components/CustomBackButton';

const ViewApartmentScreen = ({route}) => {
  const [lofftId] = useState(route.params.lofft);
  const [admin] = useState(true);
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('Loffts')
      .doc(lofftId)
      .onSnapshot(snapShot => {
        const lofft = snapShot.data();
        setTitle(lofft.name);
        setDescription(lofft.description);
        if (lofft.address) setAddress(lofft.address);
      });
    return () => unsubscribe();
  }, []);
  return (
    <View
      style={[
        CoreStyleSheet.viewContainerStyle,
        Platform.OS === 'ios' ? CoreStyleSheet.viewContainerIOSStyle : null,
        styles.overidePresets,
      ]}>
      <View style={{paddingHorizontal: 25}}>
        <CustomBackButton title="Lofft" onPress={() => navigation.goBack()} />
      </View>
      {/* Banner Background */}
      <ImageBackground style={styles.headerBanner} source={shapesBackground}>
        {/* Title Text and address container */}
        <View style={styles.title}>
          <View>
            {edit ? (
              <TextInput
                value={title}
                style={[fontStyles.headerMedium, styles.inputField]}
                onChangeText={e => {
                  setTitle(e);
                }}
              />
            ) : (
              <Text style={fontStyles.headerMedium}>{title}</Text>
            )}
            {/* Address Section */}
            {edit ? (
              <View style={styles.addField}>
                <TextInput
                  style={[fontStyles.bodySmall, styles.inputField]}
                  value={address}
                  onChangeText={e => setAddress(e)}
                  placeholder="Address line 1"
                />
              </View>
            ) : address ? (
              <View style={styles.addressBar}>
                <Text style={[fontStyles.bodySmall, styles.address]}>
                  {address}
                </Text>
              </View>
            ) : null}
          </View>
          {/* Toggle Edit mode if admin */}
          {admin ? (
            <TouchableOpacity
              onPress={() => {
                edit ? setEdit(false) : setEdit(true);
              }}>
              <Icon name="settings-outline" size={25} color={color.Black[30]} />
            </TouchableOpacity>
          ) : null}
        </View>
      </ImageBackground>
      <View style={styles.body}>
        <View style={styles.desciptionContainer}>
          {edit ? (
            <TextInput
              value={description}
              style={[fontStyles.bodySmall, styles.inputField]}
              onChangeText={e => {
                setDescription(e);
              }}
            />
          ) : (
            <Text style={fontStyles.bodySmall}>{description}</Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overidePresets: {
    paddingHorizontal: 0,
  },
  headerBanner: {
    backgroundColor: color.Mint[10],
    paddingHorizontal: 0,
    width: '100%',
    paddingTop: 65,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 15,
    height: 180,
  },
  body: {
    paddingHorizontal: 25,
  },
  textArea: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    width: '100%',
    paddingHorizontal: 25,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputField: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingVertical: 10,
    backgroundColor: color.Lavendar[10],
    marginTop: 0,
  },
  desciptionContainer: {
    marginTop: 25,
  },
  addField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  address: {
    // textAlign: 'right',
  },
  addressBar: {
    paddingLeft: 10,
    // width: '60%',
    // alignItems: 'flex-end',
    // alignSelf: 'flex-end',
  },
});

export default ViewApartmentScreen;
