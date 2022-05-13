import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import storedHobbiesAndValues from '../../data/hobbiesAndValues.json';

// Firestore
import auth from '@react-native-firebase/auth';
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
import UserIcon from '../../components/iconsAndContainers/UserIcon';
import {navigationRef} from '../../RootNavigation';
import TagIcon from '../../components/iconsAndContainers/TagIcon';
import HobbiesAndValues from '../../components/HobbiesAndValues';
import EditableTextField from '../../components/inputFields/EditableTextFields';
import ProfileHeader from '../../components/bannersAndBars/ProfileHeader';

const LofftProfile = ({route}) => {
  const [lofftId] = useState(route.params.lofft);
  const [admin, setAdmin] = useState(false);
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState('');
  const [newName, setNewName] = useState('');
  const [description, setDescription] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [address, setAddress] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [tenants, setTenants] = useState([]);
  const [update, setUpdate] = useState(false);
  // const [image, setImage]: any = useState({});
  const [tags, setTags]: any = useState([]);
  const [values, setValues] = useState({});
  // const [newValues, setNewValues] = useState({});
  const [newTags, setNewTags]: any = useState([]);

  const [selectedHobbies, setSelectedHobbies] = useState([]);
  const selectHobby = key => {
    if (!selectedHobbies.includes(key)) {
      setSelectedHobbies(selectedHobbies => [...selectedHobbies, key]);
    } else {
      const result = selectedHobbies.filter(el => {
        return el !== key;
      });
      setSelectedHobbies(result);
    }
  };

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
    setTags([]);
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
        if (lofft.users) {
          lofft.users.forEach(user => {
            userList.push(user.user_id);
            if (
              user.user_id === auth().currentUser.uid &&
              user.admin === true
            ) {
              setAdmin(true);
            }
          });
        }
        if (lofft.pendingUsers) userList.push(lofft.pendingUsers);
        if (lofft.status) {
          setTags(tags => [...tags, {value: lofft.status, color: 'Lavendar'}]);
        }
        if (lofft.hobbiesAndValues) {
          setValues(lofft.hobbiesAndValues);
          Object.entries(lofft.hobbiesAndValues).forEach(([k, v]) => {
            if (v.active) {
              if (!selectedHobbies.includes(k)) {
                setSelectedHobbies(selectedHobbies => [...selectedHobbies, k]);
              }
            }
          });
        } else {
          setValues(storedHobbiesAndValues);
        }
        const usersList = userList.join().split(',');
        usersList.forEach(async user => {
          if (user) {
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
          }
        });
      });
  }, [update]);

  const onEdit = () => {
    setEdit(true);
    setNewName(name);
    setNewAddress(address);
    setNewTags(tags);
    setNewDescription(description);
  };

  const onSave = () => {
    Object.entries(values).forEach(([k, v]) => {
      v.active = selectedHobbies.includes(k);
    });
    setName(newName);
    setAddress(newAddress);
    setTags(newTags);
    setDescription(newDescription);
    setValues(values);
    updateLofft(lofftId, newName, newDescription, newAddress, values);
    setEdit(false);
  };

  const onCancel = () => setEdit(false);

  return (
    <View style={styles.pageContainer}>
      <ProfileHeader
        navigation={navigationRef}
        edit={edit}
        admin={admin}
        onSave={onSave}
        onEdit={onEdit}
        onCancel={onCancel}
        name={name}
        newName={newName}
        updateProfileName={t => setNewName(t)}
        address={address}
        newAddress={newAddress}
        updateLofftAddress={t => setNewAddress(t)}
        lofftProfile
      />
      <ScrollView style={CoreStyleSheet.viewContainerStyle}>
        <View style={styles.pillContainer}>
          {edit
            ? null
            : tags.map(tag => {
                return (
                  <TagIcon
                    text={tag.value}
                    key={tag.value}
                    userColor={tag.color}
                  />
                );
              })}
        </View>
        <EditableTextField
          edit={edit}
          value={description}
          newValue={newDescription}
          fontStyle={fontStyles.bodySmall}
          textStyle={styles.userText}
          multiline={true}
          onChangeText={t => setNewDescription(t)}
        />
        <Text style={fontStyles.buttonTextMedium}>Co-livers</Text>
        {/* User/Tennants */}
        <View style={styles.userWindow}>
          <View style={styles.tenantSection}>
            {tenants.map(tenant => {
              return (
                <View style={styles.userCard} key={tenant.id}>
                  <UserIcon
                    image={tenant.imageURI ? {uri: tenant.imageURI} : ''}
                    onPress={() => showAlert(tenant.id, lofftId)}
                    userIconStyle={styles.userIconStyle}
                    userImageContainerStyle={styles.userImageContainerStyle}
                    userImageStyle={styles.userImageStyle}
                    disabled={tenant.pending ? false : true}
                  />
                  <Text
                    style={[fontStyles.buttonTextMedium, styles.userCardText]}>
                    {tenant.name ? tenant.name.split(' ')[0] : null}
                  </Text>
                  {tenant.pending ? <Text>Pending</Text> : null}
                </View>
              );
            })}
          </View>
        </View>
        <Text style={fontStyles.buttonTextMedium}>Photo Library</Text>
        <View style={styles.noLofftContainer}>
          <View style={styles.addImageButton}>
            <Icon name="add-outline" size={60} color={color.Black[30]} />
          </View>
        </View>
        <HobbiesAndValues
          values={values}
          selectHobby={k => selectHobby(k)}
          selectedHobbies={selectedHobbies}
          edit={edit}
        />
        {/* Add Spotify / Apple Music API here */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },
  headerBackground: {
    width: '100%',
    height: 200,
    backgroundColor: color.Mint[10],
  },
  backButton: {
    marginHorizontal: 15,
    marginTop: 35,
  },
  pillContainer: {
    flexDirection: 'row',
  },
  imageHeaderContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexDirection: 'row',
    paddingBottom: 10,
    paddingHorizontal: 15,
  },
  headerDetailsContainer: {
    flex: 1,
  },
  editForm: {
    flexDirection: 'row',
    backgroundColor: color.Black[5],
    paddingHorizontal: 5,
    lineHeight: 0,
    borderRadius: 4,
  },
  address: {
    color: color.Black[50],
  },
  pill: {
    width: 78,
    height: 19,
    borderWidth: 1,
    borderColor: color.Lavendar[100],
    borderRadius: 6,
    backgroundColor: color.Lavendar[5],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  fontColor: {
    color: color.Lavendar[100],
  },
  userText: {
    textAlign: 'justify',
    color: color.Black[50],
    marginVertical: 15,
  },
  noLofftContainer: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 15,
  },
  noLofftText: {
    color: color.Black[50],
    marginVertical: 3,
  },
  addImageButton: {
    width: 95,
    height: 95,
    backgroundColor: color.Black[10],
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  hobbyContaner: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  hobby: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: 5,
    paddingLeft: 10,
    paddingVertical: 5,
    flexBasis: '48%',
    borderRadius: 4,
    backgroundColor: color.Lavendar[5],
  },
  hobbyText: {
    marginHorizontal: 20,
  },
  userCard: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  userWindow: {
    marginTop: 15,
  },
  tenantSection: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 25,
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

export default LofftProfile;
