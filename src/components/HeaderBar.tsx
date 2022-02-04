import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {navigationRef} from '../RootNavigation';
import auth from '@react-native-firebase/auth';

// Components
import UserIcon from './UserIcon';

// Stylesheets
import {fontStyles} from './../StyleSheets/FontStyleSheet';

const HeaderBar = ({title, image = ''}) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={fontStyles.headerMedium}>{title}</Text>
      <UserIcon
        image={image}
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
