import React, { useState, useEffect, useCallback } from 'react';
import { View, ImageBackground, Text, StyleSheet, Platform } from 'react-native';
import { List } from 'react-native-paper';

// Components
import HeaderBar from '../../components/bannersAndBars/HeaderBar';
import ToggleBar from './../../components/bannersAndBars/ToggleBar';
import ActionButton from '../../components/buttons/ActionButton';
import HalfBackgroundImage from './../../assets/banner-background-half.png';

// StyleSheets
import color from '../../assets/defaultColorPallet.json';
import { CoreStyleSheet } from '../../StyleSheets/CoreDesignStyleSheet';
import { fontStyles } from '../../StyleSheets/FontStyleSheet';
import NewPollContainer from '../../components/iconsAndContainers/NewPollContainer';



const ManagementScreen = ({ navigation, route }: any) => {

  // User Hooks
  const [image, setImage]: any = useState('');
  // Hooks
  const [pollsactivated, setPollsactivated] = useState(true);
  const [expanded, setExpanded] = React.useState(true);

  const buttonToggle = useCallback(toggled => {
    setPollsactivated(toggled);
  }, []);

  const handlePress = () => setExpanded(!expanded);


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

      <NewPollContainer
        buttonValue="Create New Poll"
        buttonAction={() => navigation.navigate('')}
      />

      <List.Section>
        <List.Accordion
          title={<Text style={fontStyles.buttonTextLarge}>Active Polls</Text>}
          style={styles.accordionContainer}>
          <Text>Hello</Text>
        </List.Accordion>
      </List.Section>
    </View>
  )
}

const styles = StyleSheet.create({
  accordionContainer:{
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'flex-start',

  }
});

export default ManagementScreen;
