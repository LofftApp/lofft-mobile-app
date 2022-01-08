import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import SigninForm from './../../components/SigninForm';
import {fontStyles} from './../../StyleSheets/FontStyleSheet';
import CustomBackButton from './../../components/CustomBackButton';
const SigninScreen = ({navigation}: any) => {
  return (
    <View style={styles.containerStyle}>
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
