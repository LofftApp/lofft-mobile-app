import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import {navigationRef as navigation} from '../../RootNavigation';
import Icon from 'react-native-vector-icons/Ionicons';
import shapesBackground from './../../assets/backgroundShapes/mint.png';

// Firestore
import firestore from '@react-native-firebase/firestore';
import {confirmUserLofft} from '../../api/firebase/fireStoreActions';

// stylesheets
import color from '../../assets/defaultColorPallet.json';
import {CoreStyleSheet} from '../../StyleSheets/CoreDesignStyleSheet';
import {fontStyles} from '../../StyleSheets/FontStyleSheet';

// Components
import CustomBackButton from '../../components/buttons/CustomBackButton';
// import UserIcon from '../../components/iconsAndContainers/UserIcon';
import {navigationRef} from '../../RootNavigation';

// Images
import blueBackground from '../../assets/backgroundShapes/lavendar.png';

const ViewApartmentScreen = ({route}) => {
  const [lofftId] = useState(route.params.lofft);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [tenants, setTenants] = useState([]);
  const [update, setUpdate] = useState(false);
  const [image, setImage]: any = useState({});

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
    <View style={styles.pageContainer}>
      <ImageBackground source={blueBackground} style={styles.headerBackground}>
        <CustomBackButton
          style={styles.backButton}
          neutral={true}
          onPress={() => navigationRef.goBack()}
        />
        <View style={styles.imageHeaderContainer}>
          <Text style={[fontStyles.headerMedium, styles.header]}>{name}</Text>
          <Image source={image} style={styles.userImage} />
        </View>
      </ImageBackground>
      <ScrollView style={CoreStyleSheet.viewContainerStyle}>
        {/* <View style={styles.pillContainer}>
          {tags.map(tag => {
            return (
              <TagIcon text={tag.value} key={tag.value} userColor={tag.color} />
            );
          })}
        </View> */}
        <Text style={[fontStyles.bodySmall, styles.userText]}>
          {description}
        </Text>
        <Text style={fontStyles.buttonTextMedium}>Loffts</Text>
        <View style={styles.noLofftContainer}>
          <Text style={styles.noLofftText}>👀</Text>
          <Text style={styles.noLofftText}>Nothing to see here</Text>
          <Text style={styles.noLofftText}>They're a newbie</Text>
          <Text style={styles.noLofftText}>...........</Text>
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
    backgroundColor: color.Lavendar[10],
  },
  backButton: {
    marginHorizontal: 15,
    marginTop: 35,
  },
  pillContainer: {
    flexDirection: 'row',
  },
  imageHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'flex-end',
    paddingBottom: 10,
    paddingHorizontal: 15,
  },
  header: {
    maxWidth: '60%',
  },
  userImage: {
    width: 90,
    height: 90,
    borderWidth: 4,
    borderColor: color.Lavendar[100],
    borderRadius: 75,
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
});

export default ViewApartmentScreen;
