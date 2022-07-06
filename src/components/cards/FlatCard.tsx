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
  ColorPropType,
} from 'react-native';

// Images
import FlatCardBackground from '../../assets/paymentContainer.png'

// Styles
import { fontStyles } from '../../StyleSheets/FontStyleSheet';
import color from '../../assets/defaultColorPallet.json';

const FlatCard = ({name, icon, price, district, match}) => {
  console.log(name)
  return(
    <View>
      <ImageBackground style={styles.flatcard} source={FlatCardBackground} >
        <View style={styles.flatCardContentA}>
          <View>
            <Text style={fontStyles.buttonTextLarge}>
              {name} {icon}
            </Text>
            <Text style={fontStyles.buttonTextSmall}>16:42:23</Text>
          </View>

          <View style={{ marginTop: 30 }}>
            <Text style={[fontStyles.buttonTextSmall, {marginBottom: 2}]}>€ {price} </Text>
            <Text style={fontStyles.buttonTextSmall}>⦿ {district}</Text>
          </View>
        </View>
        <View style={styles.flatCardContentB}>
          <View style={styles.percentageCircle}>
            <Text style={[fontStyles.buttonTextLarge, { color: color.White["100"] }]}>{match}%</Text>
          </View>

          <View style={styles.applyButton}>
            <Text style={[fontStyles.buttonTextMedium, { color: color.White["100"] }]}>Apply</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({

  flatcard: {
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  flatCardContentA: {
    padding: 20,
  },
  flatCardContentB: {
    padding: 20,
    alignItems: 'center'

  },
  timeContainer: {
    backgroundColor: 'purple',
  },
  percentageCircle: {
    width: 60,
    height: 60,
    backgroundColor: color.Lavendar['100'],
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  applyButton: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: '#724EFA',
    marginTop: 20,
    borderRadius: 12,
  }


})

export default FlatCard;
