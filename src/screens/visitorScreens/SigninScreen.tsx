import React from 'react';
import {Text, View, StyleSheet, Platform} from 'react-native';

// StyleSheets
import {fontStyles} from './../../StyleSheets/FontStyleSheet';
import {CoreStyleSheet} from '../../StyleSheets/CoreDesignStyleSheet';

// Components
import SigninForm from './../../components/SigninForm';
import CustomBackButton from './../../components/CustomBackButton';

const SigninScreen = ({navigation}: any) => {
  return (
    <View
      style={[
        CoreStyleSheet.viewContainerStyle,
        Platform.OS === 'ios' ? CoreStyleSheet.viewContainerIOSStyle : null,
      ]}>
      <CustomBackButton onPress={() => navigation.goBack()} />
      <Text style={[fontStyles.headerLarge, styles.headerStyle]}>Sign in</Text>
      <SigninForm navigation={navigation} />
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

export default SigninScreen;
