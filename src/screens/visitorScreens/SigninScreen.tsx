import React from 'react';

// Components 🪢
import NavBackPage from '@Pages/NavBackPage';
import SigninForm from '@Forms/SigninForm';

const SigninScreen = ({navigation}: any) => {
  return (
    <NavBackPage navigation={() => navigation.goBack()} title="Sign in">
      <SigninForm navigation={navigation} />
    </NavBackPage>
  );
};

export default SigninScreen;
