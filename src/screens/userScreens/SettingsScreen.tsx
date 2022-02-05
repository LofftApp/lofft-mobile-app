import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const SettingsScreen = () => {
  return (
    <View style={styles.viewContainer}>
      <Text>Settings Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    marginTop: 150,
  },
});

export default SettingsScreen;
