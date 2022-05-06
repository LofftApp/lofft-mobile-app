import React from 'react';
import {View, Text, StyleSheet, Platform, TouchableOpacity} from 'react-native';
import {signout} from '../../api/firebase/firebaseApi';

// Components
import CustomBackButton from '../../components/buttons/CustomBackButton';
import {CoreButton} from '../../components/buttons/CoreButton';

// Stylesheets
import color from './../../assets/defaultColorPallet.json';
import {CoreStyleSheet} from '../../StyleSheets/CoreDesignStyleSheet';
import {fontStyles} from './../../StyleSheets/FontStyleSheet';
import {navigationRef} from '../../RootNavigation';

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
          <TouchableOpacity
            style={styles.optionsLinkText}
            onPress={() => {
              navigationRef.navigate('ProfileScreen');
            }}>
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
          invert
          value="Sign out"
          style={styles.logoutButton}
          textStyle={styles.buttonText}
          onPress={signout}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  optionsLinkText: {
    paddingVertical: 25,
    borderBottomWidth: 1,
    borderBottomColor: color.Black[10],
  },
  buttonText: {
    color: color.Tomato[100],
  },
  logoutButton: {
    borderColor: color.Tomato[100],
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 45,
  },
});

export default UserOptionsScreen;
