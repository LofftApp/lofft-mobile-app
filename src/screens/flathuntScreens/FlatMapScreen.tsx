import React, { useState, useCallback } from 'react';

import {
  AppRegistry,
  View,
  Text,
  StyleSheet,
  Platform,
  TextInput,
  SafeAreaView,
  ScrollView,
  Animated,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

// Stylesheets
import { CoreStyleSheet } from '../../StyleSheets/CoreDesignStyleSheet';
import { fontStyles } from '../../StyleSheets/FontStyleSheet';
import color from '../../assets/defaultColorPallet.json';

// Components
import HeaderBarFlatHunt from '../../components/bannersAndBars/HeaderBarFlatHunt';
import ToggleBar from '../../components/bannersAndBars/ToggleBar';
import FlatMap from '../../components/map/FlatMap';


// React
import { navigationRef as navigation } from '../../RootNavigation';



const FlatMapScreen = () => {

  const [mapActive, setmapActive] = useState(true);
  const [flats, setFlats] = useState([{ address: 'Schlegel Strase 14, Berlin', icon: '⚡️' }, { address: 'Rudi Duschke Str 2, Berlin', icon: '🦄' }, { address: 'Oranienstraße 8, Berlin', icon: '🌈' }, { address: 'Unter den Linden 9, Berlin', icon: '🗽' }, { address: 'Wilsnackerstrasse 13, Berlin', icon: '💎' }])


  const buttonToggle = useCallback(toggled => {
    setmapActive(toggled);
  }, []);

  return (
    <>
      <View
        style={[
          CoreStyleSheet.viewContainerStyle,
          Platform.OS === 'ios' ? CoreStyleSheet.viewContainerIOSStyle : null,
        ]}>
        <HeaderBarFlatHunt onPress={() => navigation.goBack()} />
        <Text style={fontStyles.headerMedium}>Places</Text>
        <Text style={[fontStyles.buttonTextMedium, styles.dataText]}>
          Cowoabonga Freddie,{"\n"}
          currently
          <Text style={{ color: color.Lavendar[80] }}> {flats.length-1} </Text>
          people are looking for someone cool like you 😎.
        </Text>

        <ToggleBar
          optionA="Map"
          optionB="List"
          dashboard={buttonToggle}
        />



      </View>
      <FlatMap flats={flats} />

    </>
  )
};

const styles = StyleSheet.create({
  dataText: {
    width: '80%',
  },

});

export default FlatMapScreen;
