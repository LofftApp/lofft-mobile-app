import React, {useContext} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {Context as AuthContext} from './../../context/AuthContext';

const SettingsScreen = () => {
  const {signout} = useContext(AuthContext);
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
