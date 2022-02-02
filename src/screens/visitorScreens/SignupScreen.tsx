import React, {useContext} from 'react';
import {View, Platform} from 'react-native';

// StyleSheets
import {CoreStyleSheet} from '../../StyleSheets/CoreDesignStyleSheet';
// Components
import CustomBackButton from './../../components/CustomBackButton';
import SigninForm from './../../components/SigninForm';

const SignupScreen = ({navigation}: any) => {
  return (
    <View
      style={[
        CoreStyleSheet.viewContainerStyle,
        Platform.OS === 'ios' ? CoreStyleSheet.viewContainerIOSStyle : null,
      ]}>
      <CustomBackButton
        onPress={() => navigation.goBack()}
        title="Create account"
      />
      <SigninForm navigation={navigation} signupForm={true} />
    </View>
  );
};

export default SignupScreen;
