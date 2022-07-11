import React from 'react';
import {View, Platform} from 'react-native';

// StyleSheets
import {CoreStyleSheet} from '@StyleSheets/CoreDesignStyleSheet';
// Components
import CustomBackButton from '@Buttons/CustomBackButton';
import SigninForm from '@Forms/SigninForm';
import NavBackPage from '@Pages/NavBackPage';

const SignupScreen = ({navigation}: any) => {
  return (
    <NavBackPage navigation={() => navigation.goBack()} title="Sign up">
      <SigninForm navigation={navigation} signupForm={true} />
    </NavBackPage>
  );
};

export default SignupScreen;
