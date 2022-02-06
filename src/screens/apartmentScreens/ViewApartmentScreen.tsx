import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import {navigationRef as navigation} from '../../RootNavigation';

// stylesheets
import color from '../../assets/defaultColorPallet.json';
import {CoreStyleSheet} from '../../StyleSheets/CoreDesignStyleSheet';
import {fontStyles} from '../../StyleSheets/FontStyleSheet';

// Components
import CustomBackButton from '../../components/CustomBackButton';

const ViewApartmentScreen = () => {
  return (
    <View
      style={[
        CoreStyleSheet.viewContainerStyle,
        Platform.OS === 'ios' ? CoreStyleSheet.viewContainerIOSStyle : null,
      ]}>
      <CustomBackButton title="Lofft" onPress={() => navigation.goBack()} />
      <Text>Lofft Details page</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ViewApartmentScreen;
