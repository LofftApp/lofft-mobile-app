import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {navigationRef} from '../RootNavigation';
import auth from '@react-native-firebase/auth';
import {getUserImage} from '../api/firebase/fireStoreActions';

// Components
import UserIcon from './UserIcon';

// Stylesheets
import {fontStyles} from './../StyleSheets/FontStyleSheet';

const HeaderBar = ({title}) => {
  const [userImage, setUserImage]: any = useState('');
  const [currentUser] = useState(auth().currentUser);
  useEffect(() => {
    if (currentUser.photoURL) setUserImage({uri: currentUser.photoURL});
  }, []);

  return (
    <View style={styles.headerContainer}>
      <Text style={fontStyles.headerMedium}>{title}</Text>
      <UserIcon
        image={userImage}
        onPress={() => {
          navigationRef.navigate('UserOptions');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
});

export default HeaderBar;
