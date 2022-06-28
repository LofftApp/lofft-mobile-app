import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {navigationRef} from '../../RootNavigation';

// Components
import UserIcon from '../iconsAndContainers/UserIcon';

// Stylesheets
import {fontStyles} from '../../StyleSheets/FontStyleSheet';

const HeaderBar = ({title, image = ''}) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={fontStyles.headerMedium}>{title}</Text>
      <UserIcon
        image={image}
        onPress={() => {
          navigationRef.navigate('UserOptions');
        }}
        iconSize={30}
        style={styles.iconStyle}
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
  iconStyle: {
    width: 58,
    height: 58,
  },
});

export default HeaderBar;
