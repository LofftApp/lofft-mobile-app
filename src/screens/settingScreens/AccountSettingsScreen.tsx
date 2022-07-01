import React from 'react';
import {Text, View, StyleSheet, Platform} from 'react-native';

// Components
import HeaderBar from '../../components/bannersAndBars/HeaderBar';

// Style Sheets
import {CoreStyleSheet} from '../../StyleSheets/CoreDesignStyleSheet';
import {fontStyles} from '../../StyleSheets/FontStyleSheet';
import color from '../../assets/defaultColorPallet.json';

const AccountSettingsScreen = () => {
  return (
    <View
      style={[
        CoreStyleSheet.viewContainerStyle,
        Platform.OS === 'ios' ? CoreStyleSheet.viewContainerIOSStyle : null,
      ]}>
      <HeaderBar title="My Settings" />
      <Text>account screen</Text>
    </View>
  );
};

export default AccountSettingsScreen;
