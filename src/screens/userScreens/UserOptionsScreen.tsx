import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import {signout} from '../../api/firebase/firebaseApi';

// Components
import CustomBackButton from '../../components/CustomBackButton';

// Stylesheets
import color from './../../assets/defaultColorPallet.json';
import {CoreStyleSheet} from '../../StyleSheets/CoreDesignStyleSheet';
import {fontStyles} from './../../StyleSheets/FontStyleSheet';
import {navigationRef} from '../../RootNavigation';
import {CoreButton} from '../../components/CoreButton';

const UserOptionsScreen = () => {
  return (
    <View
      style={[
        CoreStyleSheet.viewContainerStyle,
        Platform.OS === 'ios' ? CoreStyleSheet.viewContainerIOSStyle : null,
      ]}>
      <CustomBackButton
        onPress={() => navigationRef.goBack()}
        title="Options"
      />
      <View>
        <View style={styles.linkContainer}>
          <Text style={[fontStyles.buttonTextLarge, styles.textStyle]}>
            Profile
          </Text>
          <Text style={[fontStyles.buttonTextLarge, styles.textStyle]}>
            Account Settings
          </Text>
          <Text style={[fontStyles.buttonTextLarge, styles.textStyle]}>
            Billing Information
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <CoreButton
          value="Sign out"
          userStyle={styles.logoutButton}
          onPress={signout}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  linkContainer: {
    marginTop: 25,
  },
  textStyle: {
    borderLeftColor: color.Black[30],
    paddingVertical: 25,
    marginVertical: 10,
  },
  logoutButton: {
    backgroundColor: color.Tomato[100],
    borderColor: color.Tomato[100],
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 45,
  },
});

export default UserOptionsScreen;
