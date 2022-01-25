import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';

// Components
import HeaderBar from '../../components/HeaderBar';

// Stylesheets
import color from './../../assets/defaultColorPallet.json';
import {CoreStyleSheet} from '../../StyleSheets/CoreDesignStyleSheet';
import {fontStyles} from './../../StyleSheets/FontStyleSheet';

// Images
import userImage from './../../assets/user.jpeg';

const CostsScreen = () => {
  return (
    <View
      style={[
        CoreStyleSheet.viewContainerStyle,
        Platform.OS === 'ios' ? CoreStyleSheet.viewContainerIOSStyle : null,
        styles.container,
      ]}>
      <HeaderBar titleText="Hello James" />
      <View style={styles.notification}>
        <Text style={[fontStyles.bodyMedium, styles.notificationText]}>
          welcome to Lofft - Finish creating your profile
        </Text>
      </View>
      <View style={[styles.notification, styles.appNotification]}>
        <Text style={[fontStyles.bodyMedium, styles.notificationText]}>
          It does not look like you're apart of a Lofft, find your perfect
          shared appartment through our app.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  notification: {
    width: '100%',
    padding: 15,
    borderRadius: 12,
    backgroundColor: color.Mint[80],
    marginVertical: 10,
  },
  notificationText: {
    color: color.White[100],
    textAlign: 'justify',
  },
  appNotification: {
    backgroundColor: color.Gold[80],
  },
});

export default CostsScreen;
