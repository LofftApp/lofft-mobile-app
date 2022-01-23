import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {signout} from '../../api/firebase/firebaseApi';

const SettingsScreen = () => {
  return (
    <View style={styles.viewContainer}>
      <Text>Settings Screen</Text>
      <Button title="Signout" onPress={signout} />
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    marginTop: 150,
  },
});

export default SettingsScreen;
