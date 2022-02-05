import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import {navigationRef as navigation} from '../../RootNavigation';

// StyleSheets
import color from '../../assets/defaultColorPallet.json';
import {CoreStyleSheet} from '../../StyleSheets/CoreDesignStyleSheet';
import {fontStyles} from '../../StyleSheets/FontStyleSheet';

// Componenets
import CustomBackButton from '../../components/CustomBackButton';

const JoinApartmentScreen = () => {
  return (
    <View
      style={[
        CoreStyleSheet.viewContainerStyle,
        Platform.OS === 'ios' ? CoreStyleSheet.viewContainerIOSStyle : null,
      ]}>
      <CustomBackButton
        onPress={() => navigation.goBack()}
        title="Join a Lofft"
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default JoinApartmentScreen;
