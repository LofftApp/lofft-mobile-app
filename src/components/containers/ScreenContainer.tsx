import React from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import CustomBackButton from '@Buttons/CustomBackButton';
import {navigationRef} from '../../RootNavigation';

//  Style Sheets
import {CoreStyleSheet} from '@StyleSheets/CoreDesignStyleSheet';

const ScreenContainer = props => {
  return (
    <View
      style={[
        CoreStyleSheet.viewContainerStyle,
        Platform.OS === 'ios' ? CoreStyleSheet.viewContainerIOSStyle : null,
      ]}>
      <CustomBackButton
        title={props.pageTitle}
        onPress={() => navigationRef.goBack()}
      />
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({});

export default ScreenContainer;
