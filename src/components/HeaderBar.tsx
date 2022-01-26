import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {navigationRef} from '../RootNavigation';

// Components
import UserIcon from './UserIcon';

// Stylesheets
import {fontStyles} from './../StyleSheets/FontStyleSheet';

const HeaderBar = ({titleText}) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={fontStyles.headerMedium}>{titleText}</Text>
      <UserIcon onPress={() => navigationRef.navigate('UserOptions')} />
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
