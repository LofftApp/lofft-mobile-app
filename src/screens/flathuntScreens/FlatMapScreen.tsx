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
import FlatList from './FlatList';


// React
import { navigationRef as navigation } from '../../RootNavigation';



const FlatMapScreen = () => {

  const [mapActive, setmapActive] = useState(true);
  const [flats, setFlats] = useState([{ address: 'Schlegel Strase 14, Berlin', icon: '⚡️', price: 600, match: 88, name: "Flash Boyz", district: 'Mitte' }, { address: 'Rudi Duschke Str 2, Berlin', icon: '🦄', price: 900, match: 92, name: "Unicorns", district: 'Xberg' }, { address: 'Oranienstraße 8, Berlin', icon: '🌈', price: 1200, match: 83, name: "Pride Boyz", district: 'Mitte' }, { address: 'Unter den Linden 9, Berlin', icon: '🗽', price: 500, match: 74, name: "Neoliberals", district: 'Charlottenburg' }, { address: 'Wilsnackerstrasse 13, Berlin', icon: '💎', price: 700, match: 86, name: "Rubyz", district: 'Moabit' }, ])


  console.log(mapActive)

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
          <Text style={{ color: '#724EFA' }}> {flats.length-1} </Text>
          people are looking for someone cool like you 😎.
        </Text>

        <ToggleBar
          optionA="Map"
          optionB="List"
          dashboard={buttonToggle}
        />

        <View style={styles.optionsContainer}>
          <Text style={fontStyles.buttonTextMedium}>Sort </Text>
          <Text style={fontStyles.buttonTextMedium}>Filter </Text>
        </View>

        {mapActive ? <FlatMap flats={flats} /> : <FlatList flats={flats} />}

      </View>






    </>
  )
};

const styles = StyleSheet.create({
  dataText: {
    width: '80%',
  },

  optionsContainer:{
    marginTop: 10,
    width: '100$´%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    borderRadius: 10,
  }

});

export default FlatMapScreen;
