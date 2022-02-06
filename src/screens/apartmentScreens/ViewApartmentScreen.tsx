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
  const [tenants, setTenants] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('Loffts')
      .doc(lofftId)
      .onSnapshot(snapShot => {
        const lofft = snapShot.data();
        setTitle(lofft.name);
        setDescription(lofft.description);
        if (lofft.address) setAddress(lofft.address);
        lofft.users.forEach(async user => {
          const queryUser = await firestore()
            .collection('Users')
            .doc(user)
            .get();
          const response = queryUser.data();
          setTenants([
            ...tenants,
            {name: response.name, imageURI: response.imageURI},
          ]);
        });
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
      <ImageBackground
        source={shapesBackground}
        style={styles.imageBannerBackground}>
        <View style={styles.headerUpload}>
          <Text>🏳️‍🌈 🌱</Text>
          {admin ? (
            <Icon name="image-outline" size={25} color={color.Black[30]} />
          ) : null}
        </View>
        <View style={styles.headerBanner}>
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
                <Icon
                  name="settings-outline"
                  size={25}
                  color={color.Black[30]}
                />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </ImageBackground>
      <View style={styles.body}>
        {/* Lofft Description Section */}
        <View style={styles.desciptionContainer}>
          {edit ? (
            <TextInput
              value={description}
              style={[fontStyles.bodySmall, styles.inputField]}
              multiline
              onChangeText={e => {
                setDescription(e);
              }}
            />
          ) : (
            <Text style={[fontStyles.bodySmall, styles.description]}>
              {description}
            </Text>
          )}
        </View>
        {/* User/Tennants */}
        <View style={styles.userWindow}>
          <Text>Tenants</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overidePresets: {
    paddingHorizontal: 0,
  },
  imageBannerBackground: {
    backgroundColor: color.Mint[10],
    paddingVertical: 10,
    marginTop: 25,
  },
  headerBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 150,
  },
  headerUpload: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
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
  address: {},
  addressBar: {
    paddingLeft: 10,
  },
  description: {
    textAlign: 'justify',
  },
  userWindow: {
    marginTop: 15,
  },
});

export default ViewApartmentScreen;
