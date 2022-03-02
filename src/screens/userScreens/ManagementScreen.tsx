import React, { useState, useEffect, useCallback } from 'react';
import { View, ImageBackground, Text, StyleSheet, Platform } from 'react-native';

// Components
import HeaderBar from '../../components/bannersAndBars/HeaderBar';
import ToggleBar from './../../components/bannersAndBars/ToggleBar';
import ActionButton from '../../components/buttons/ActionButton';
import HalfBackgroundImage from './../../assets/banner-background-half.png';

// StyleSheets
import color from '../../assets/defaultColorPallet.json';
import { CoreStyleSheet } from '../../StyleSheets/CoreDesignStyleSheet';
import { fontStyles } from '../../StyleSheets/FontStyleSheet';



const ManagementScreen = ({ navigation }: any) => {

  // User Hooks
  const [image, setImage]: any = useState('');
  // Hooks
  const [pollsactivated, setPollsactivated] = useState(true);

  const buttonToggle = useCallback(toggled => {
    setPollsactivated(toggled);
  }, []);



  return(
    <View
      style={[
        CoreStyleSheet.viewContainerStyle,
        Platform.OS === 'ios' ? CoreStyleSheet.viewContainerIOSStyle : null,
      ]}>

      <HeaderBar title="Management" image={image} />
      <ToggleBar
        optionA="Polls"
        optionB="Flat's calendar"
        dashboard={buttonToggle}
      />

      <View style={styles.newPollContainer}>
        <ImageBackground
          source={HalfBackgroundImage}
          style={styles.ItemPendingPayment}>
        </ImageBackground>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  newPollContainer:{
    paddingVertical: 16,
    height: 85,
    marginTop: 20,
    overflow: 'hidden',
    borderRadius: 16,
    backgroundColor: color.Lavendar[10],
  }
});

export default ManagementScreen;
