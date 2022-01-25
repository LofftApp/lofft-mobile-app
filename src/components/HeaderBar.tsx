import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

// Components
import UserIcon from './UserIcon';

// Stylesheets
import {fontStyles} from './../StyleSheets/FontStyleSheet';

// Images
import userImage from './../assets/user.jpeg';

const HeaderBar = ({titleText}) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={fontStyles.headerMedium}>{titleText}</Text>
      <UserIcon image={userImage} />
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
