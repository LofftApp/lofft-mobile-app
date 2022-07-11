import React, {useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
// import {signout} from '../../api/firebase/firebaseApi';
import {Context as UserDetails} from '../../context/UserDetailsContext';

// Components 🪢
import NavBackPage from '@Pages/NavBackPage';
import {CoreButton} from '@Buttons/CoreButton';

// Stylesheets 🖌
import color from '@Assets/lofftColorPallet.json';
import {fontStyles} from '@StyleSheets/FontStyleSheet';
import {navigationRef as navigate} from '../../RootNavigation';

const UserOptionsScreen = () => {
  const {signout} = useContext(UserDetails);
  return (
    <NavBackPage navigation={() => navigate.goBack()} title="Options">
      <View>
        <View style={styles.linkContainer}>
          <TouchableOpacity
            style={styles.optionsLinkText}
            onPress={() => {
              navigate.navigate('ProfileScreen');
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
    </NavBackPage>
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
