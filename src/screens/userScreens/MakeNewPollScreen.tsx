import React from "react";
import { View, Text, StyleSheet, } from 'react-native';

// Components
import HeaderBar from '../../components/bannersAndBars/HeaderBar';
import CustomBackButton from '../../components/buttons/CustomBackButton';

// Styles
import { CoreStyleSheet } from '../../StyleSheets/CoreDesignStyleSheet';
import { fontStyles } from '../../StyleSheets/FontStyleSheet';


const MakeNewPollScreen = ({ navigation, route}) => {
  return(
    <View
      style={[
        CoreStyleSheet.viewContainerStyle,
        Platform.OS === 'ios' ? CoreStyleSheet.viewContainerIOSStyle : null,
      ]}>
      <CustomBackButton
        onPress={() => navigation.goBack()}
        title="Create new poll"
      />
    </View>
  )
}

const styles = StyleSheet.create({

})

export default MakeNewPollScreen;
