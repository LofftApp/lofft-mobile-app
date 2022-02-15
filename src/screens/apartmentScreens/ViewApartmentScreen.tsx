import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Alert,
} from 'react-native';
import {navigationRef as navigation} from '../../RootNavigation';
import Icon from 'react-native-vector-icons/Ionicons';
import shapesBackground from './../../assets/backgroundShapes/mint.png';

// Firestore
import firestore from '@react-native-firebase/firestore';
import {
  confirmUserLofft,
  updateLofft,
} from '../../api/firebase/fireStoreActions';

// stylesheets
import color from '../../assets/defaultColorPallet.json';
import {CoreStyleSheet} from '../../StyleSheets/CoreDesignStyleSheet';
import {fontStyles} from '../../StyleSheets/FontStyleSheet';

// Components
import CustomBackButton from '../../components/CustomBackButton';
import UserIcon from '../../components/UserIcon';
import HeaderImageBanner from '../../components/HeaderImageBanner';

const ViewApartmentScreen = ({route}) => {
  const [lofftId] = useState(route.params.lofft);
  const [admin] = useState(true);
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [tenants, setTenants] = useState([]);
  const [update, setUpdate] = useState(false);

  const showAlert = (userId, lofftId) =>
    Alert.alert('Approve user', 'My Alert Msg', [
      {
        text: 'Confirm',
        onPress: () => {
          confirmUserLofft(userId, lofftId);
          update ? setUpdate(false) : setUpdate(true);
        },
        style: 'default',
      },
      {
        text: 'Reject',
        onPress: () => Alert.alert('Cancel Pressed'),
        style: 'destructive',
      },
      {
        text: 'Cancel',
        onPress: () => Alert.alert('Cancel Pressed'),
        style: 'cancel',
      },
    ]);

  useEffect(() => {
    firestore()
      .collection('Loffts')
      .doc(lofftId)
      .get()
      .then(queryData => {
        const userList = [];
        setTenants([]);
        const lofft = queryData.data();
        setName(lofft.name);
        setDescription(lofft.description);
        if (lofft.address) setAddress(lofft.address);
        if (lofft.users.length > 0) userList.push(lofft.users);
        if (lofft.pendingUsers.length > 0) userList.push(lofft.pendingUsers);
        const usersList = userList.join().split(',');
        usersList.forEach(async user => {
          const response = await firestore()
            .collection('Users')
            .doc(user)
            .get();
          const userData = response.data();
          setTenants(tenants => [
            ...tenants,
            {
              name: userData.name,
              imageURI: userData.imageURI,
              id: user,
              pending: userData.lofft.pending,
            },
          ]);
        });
      });
  }, [update]);

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
      <HeaderImageBanner
        nameParameters={{name, setNameValue: e => setName(e)}}
        subInfo={{value: address, setSubInfoValue: e => setAddress(e)}}
        editState={{edit, setEditValue: () => setEdit(true)}}
        updateButton={() => {
          updateLofft(lofftId, name, description, address);
          edit ? setEdit(false) : setEdit(true);
        }}
      />
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
          <View style={styles.tenantSection}>
            {tenants.map(t => {
              return (
                <View style={styles.userCard} key={t.name}>
                  <UserIcon
                    image={t.imageURI ? {uri: t.imageURI} : ''}
                    onPress={() => showAlert(t.id, lofftId)}
                    userIconStyle={styles.userIconStyle}
                    userImageContainerStyle={styles.userImageContainerStyle}
                    userImageStyle={styles.userImageStyle}
                    disabled={t.pending ? false : true}
                  />
                  <Text
                    style={[fontStyles.buttonTextMedium, styles.userCardText]}>
                    {t.name.split(' ')[0]}
                  </Text>
                  {t.pending ? <Text>Pending</Text> : null}
                </View>
              );
            })}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overidePresets: {
    paddingHorizontal: 0,
  },
  body: {
    paddingHorizontal: 25,
  },
  desciptionContainer: {
    marginTop: 25,
  },
  description: {
    textAlign: 'justify',
  },
  userWindow: {
    marginTop: 15,
  },
  tenantSection: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },
  userCard: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  userCardText: {marginVertical: 10},
  userIconStyle: {
    width: 85,
    height: 85,
  },
  userImageContainerStyle: {
    width: 70,
    height: 70,
    borderColor: color.White[0],
  },
  userImageStyle: {
    width: 70,
    height: 70,
  },
});

export default ViewApartmentScreen;
