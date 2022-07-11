import React from 'react';
import {View, Platform, StyleSheet} from 'react-native';

// Components 🪢
import CustomBackButton from '@Buttons/CustomBackButton';

// StyleSheets
import {CoreStyleSheet} from '@StyleSheets/CoreDesignStyleSheet';

const NavBackPage = ({navigation, title, children}) => {
  return (
    <View
      style={[
        CoreStyleSheet.viewContainerStyle,
        Platform.OS === 'ios' ? CoreStyleSheet.viewContainerIOSStyle : null,
      ]}>
      <CustomBackButton onPress={navigation} title={title} />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({});

export default NavBackPage;
