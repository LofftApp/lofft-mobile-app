import React from 'react';
import {View, Text, StyleSheet, Platform, TouchableOpacity} from 'react-native';
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
          <TouchableOpacity style={styles.optionsLinkText}>
            <Text style={[fontStyles.bodyLarge, styles.textStyle]}>
              Profile
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionsLinkText}>
            <Text style={[fontStyles.bodyLarge, styles.textStyle]}>
              Account Settings
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionsLinkText}>
            <Text style={[fontStyles.bodyLarge, styles.textStyle]}>
              Billing Information
            </Text>
          </TouchableOpacity>
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
  optionsLinkText: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: color.Black[30],
  },
  textStyle: {},
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
