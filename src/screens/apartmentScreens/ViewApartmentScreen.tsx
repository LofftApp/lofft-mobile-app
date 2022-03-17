import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  ScrollView,
  Alert,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// Firestore
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {confirmUserLofft} from '../../api/firebase/fireStoreActions';

// stylesheets
import color from '../../assets/defaultColorPallet.json';
import {CoreStyleSheet} from '../../StyleSheets/CoreDesignStyleSheet';
import {fontStyles} from '../../StyleSheets/FontStyleSheet';

// Components
import CustomBackButton from '../../components/buttons/CustomBackButton';
import UserIcon from '../../components/iconsAndContainers/UserIcon';
import {navigationRef} from '../../RootNavigation';
import TagIcon from '../../components/iconsAndContainers/TagIcon';

// Images
import blueBackground from '../../assets/backgroundShapes/mint.png';

const ViewApartmentScreen = ({route}) => {
  const [lofftId] = useState(route.params.lofft);
  const [admin, setAdmin] = useState(false);
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('this is an address');
  const [tenants, setTenants] = useState([]);
  const [update, setUpdate] = useState(false);
  const [image, setImage]: any = useState({});
  const [tags, setTags]: any = useState([]);

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
              console.log(user.admin);
            }
          });
        }
        if (lofft.pendingUsers) userList.push(lofft.pendingUsers);
        if (lofft.status) {
          setTags(tags => [...tags, {value: lofft.status, color: 'Lavendar'}]);
        }
        const usersList = userList.join().split(',');
        console.log(usersList);
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
    <View style={styles.pageContainer}>
      <ImageBackground source={blueBackground} style={styles.headerBackground}>
        <CustomBackButton
          style={styles.backButton}
          neutral={true}
          onPress={() => navigationRef.goBack()}
        />
        <View style={styles.imageHeaderContainer}>
          <View style={styles.headerDetailsContainer}>
            {edit ? (
              <TextInput
                value={name}
                style={[fontStyles.headerMedium, styles.editForm]}
                onChangeText={t => {
                  setName(t);
                }}
              />
            ) : (
              <Text style={[fontStyles.headerMedium]}>{name}</Text>
            )}
            {edit ? (
              <TextInput
                value={address}
                style={[
                  fontStyles.bodyExtraSmall,
                  styles.address,
                  styles.editForm,
                ]}
                onChangeText={t => {
                  setAddress(t);
                }}
              />
            ) : (
              <Text style={[fontStyles.bodyExtraSmall, styles.address]}>
                {address}
              </Text>
            )}
          </View>
          {edit && admin ? (
            <View>
              <Icon
                name="checkmark-outline"
                size={30}
                color={color.Black[30]}
              />
              <TouchableOpacity onPress={() => setEdit(false)}>
                <Icon name="close-outline" size={30} color={color.Black[30]} />
              </TouchableOpacity>
            </View>
          ) : admin ? (
            <TouchableOpacity onPress={() => setEdit(true)}>
              <Icon name="settings-outline" size={30} color={color.Black[30]} />
            </TouchableOpacity>
          ) : null}
        </View>
      </ImageBackground>
      <ScrollView style={CoreStyleSheet.viewContainerStyle}>
        <View style={styles.pillContainer}>
          {tags.map(tag => {
            return (
              <TagIcon text={tag.value} key={tag.value} userColor={tag.color} />
            );
          })}
        </View>
        {edit ? (
          <TextInput
            value={description}
            style={[fontStyles.bodySmall, styles.userText, styles.editForm]}
            multiline={true}
            onChangeText={t => {
              setDescription(t);
            }}
          />
        ) : (
          <Text style={[fontStyles.bodySmall, styles.userText]}>
            {description}
          </Text>
        )}

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
        <Text style={fontStyles.buttonTextMedium}>Hobbies</Text>
        <View style={styles.hobbyContaner}>
          <View style={styles.hobby}>
            <Icon name="megaphone-outline" size={36} color={color.Black[100]} />
            <Text style={[fontStyles.bodySmall, styles.hobbyText]}>
              Politics
            </Text>
          </View>
          <View style={styles.hobby}>
            <Icon
              name="restaurant-outline"
              size={36}
              color={color.Black[100]}
            />
            <Text style={[fontStyles.bodySmall, styles.hobbyText]}>Cookng</Text>
          </View>
          <View style={styles.hobby}>
            <Icon name="fast-food-outline" size={36} color={color.Black[100]} />
            <Text style={[fontStyles.bodySmall, styles.hobbyText]}>
              Eating Out
            </Text>
          </View>
          <View style={styles.hobby}>
            <Icon name="happy-outline" size={36} color={color.Black[100]} />
            <Text style={[fontStyles.bodySmall, styles.hobbyText]}>
              Meditation
            </Text>
          </View>
          {/* Add Spotify / Apple Music API here */}
        </View>
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
    // marginVertical: 2,
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
    justifyContent: 'center',
    marginVertical: 10,
    flexBasis: '50%',
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

export default ViewApartmentScreen;
