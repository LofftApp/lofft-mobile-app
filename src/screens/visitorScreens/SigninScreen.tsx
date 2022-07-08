import React from 'react';
import {View, Platform} from 'react-native';

// StyleSheets
import {CoreStyleSheet} from '@StyleSheets/CoreDesignStyleSheet';

// Components
import SigninForm from '@Forms/SigninForm';
import CustomBackButton from '@Buttons/CustomBackButton';

const SigninScreen = ({navigation}: any) => {
  return (
    <View
      style={[
        CoreStyleSheet.viewContainerStyle,
        Platform.OS === 'ios' ? CoreStyleSheet.viewContainerIOSStyle : null,
      ]}>
      <CustomBackButton onPress={() => navigation.goBack()} title="Sign in" />
      <SigninForm navigation={navigation} />
    </View>
  );
};

export default SigninScreen;
