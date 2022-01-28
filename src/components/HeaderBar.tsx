import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {navigationRef} from '../RootNavigation';
import getAuth from '@react-native-firebase/auth';

// Components
import UserIcon from './UserIcon';

// Stylesheets
import {fontStyles} from './../StyleSheets/FontStyleSheet';

const HeaderBar = ({titleText}) => {
  const [userImage, setUserImage]: any = useState('');
  useEffect(() => {
    const user = getAuth().currentUser;
    setUserImage({uri: user.photoURL});
  }, []);
  return (
    <View style={styles.headerContainer}>
      <Text style={fontStyles.headerMedium}>{titleText}</Text>
      <UserIcon
        image={userImage}
        onPress={() => navigationRef.navigate('UserOptions')}
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
