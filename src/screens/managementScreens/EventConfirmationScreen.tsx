import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// StyleSheets
import color from '../../assets/defaultColorPallet.json';
import { fontStyles } from '../../StyleSheets/FontStyleSheet';
import { CoreStyleSheet } from '../../StyleSheets/CoreDesignStyleSheet';

// Components
import CustomBackButton from '../../components/buttons/CustomBackButton';

const EventConfirmationScreen = ({ navigation, route }: any) => {


  return (
    <View
      style={[
        CoreStyleSheet.viewContainerStyle,
        Platform.OS === 'ios' ? CoreStyleSheet.viewContainerIOSStyle : null,
      ]}>
      <CustomBackButton
        onPress={() => navigation.navigate('Managment')}
        title="To Flats Calander"
        close
      />
      <View style={styles.pageContainer}>
        <Icon
          style={{ marginLeft: 3 }}
          name="checkmark-circle"
          size={112}
          color={color.Mint[100]}
        />
        <Text style={[fontStyles.buttonTextLarge, styles.subHeader]}>
          Relax !! {"\n"} Your event has been added to the calender  {"\n"} 🚀  🚀  🚀
        </Text>
        <Text style={fontStyles.bodyMedium}></Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    paddingVertical: 50,
    paddingHorizontal: 15,
    backgroundColor: color.White[100],
    flex: 1,
  },
  pageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subHeader: {
    marginVertical: 20,
    textAlign:'center',
  },
});

export default EventConfirmationScreen;
