import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';

// StyleSheets
import {fontStyles} from './../../StyleSheets/FontStyleSheet';
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
      <CustomBackButton onPress={() => navigation.goBack()} />
      <Text style={[fontStyles.headerLarge, styles.headerStyle]}>
        Create account
      </Text>
      <SigninForm navigation={navigation} signupForm={true} />
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: '#fff',
    flex: 1,
    paddingVertical: 55,
    paddingHorizontal: 15,
  },
  headerStyle: {
    maxWidth: 300,
  },
});

export default SignupScreen;
