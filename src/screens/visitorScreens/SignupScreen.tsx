import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SigninForm from './../../components/SigninForm';
import {fontStyles} from './../../StyleSheets/FontStyleSheet';
import CustomBackButton from './../../components/CustomBackButton';

const SignupScreen = ({navigation}: any) => {
  return (
    <View style={styles.containerStyle}>
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
