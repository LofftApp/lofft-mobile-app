import React, {useState} from "react";

import {
  View,
  Text,
  StyleSheet,
  Platform,
  TextInput,
  SafeAreaView,
  ScrollView,
} from 'react-native';


// Components 🪢
import HeaderBar from '../../components/bannersAndBars/HeaderBar';
import CustomBackButton from '../../components/buttons/CustomBackButton';
import { CoreButton } from '../../components/buttons/CoreButton';

// Stylesheets
import color from './../../assets/defaultColorPallet.json';
import { CoreStyleSheet } from '../../StyleSheets/CoreDesignStyleSheet';
import { fontStyles } from './../../StyleSheets/FontStyleSheet';
import { navigationRef } from '../../RootNavigation';

const FlatHuntScreen = () => {

  const [image, setImage]: any = useState('');
  const [city, setCity]: any = useState('');

  return(
    <View
      style={[
        CoreStyleSheet.viewContainerStyle,
        Platform.OS === 'ios' ? CoreStyleSheet.viewContainerIOSStyle : null,
      ]}>
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}>
          <View style={styles.HeaderBarFlex}>
            <Text style={[fontStyles.headerMedium]}>Looking for a new <Text style={{color:color.Lavendar[80]}}>Home</Text>?</Text>
            <HeaderBar title="" image={image} />
          </View>

          <View style={{marginTop: 20}}>
            <Text style={fontStyles.buttonTextMedium}>Where? 👀</Text>
            <View style={styles.questionInputContainer}>
              <TextInput
                style={[styles.questionInputStyle, fontStyles.bodyMedium]}
                keyboardType="email-address"
                placeholder="Berlin for Instance?"
                autoCapitalize="none"
                value={city}
                onChangeText={text => setCity(text)}
                multiline={false}
              />
            </View>
          </View>

        </ScrollView>
        </SafeAreaView>
        </View>
  );
};

const styles = StyleSheet.create({
  HeaderBarFlex: {
    flexDirection: 'row',
    width: '49%',
    alignItems: 'flex-start',
  },
  questionInputStyle: {
    height: 56,
    width: '100%',
    paddingHorizontal: 15,
    fontSize: 24,
    marginVertical: 5,
    backgroundColor: color.Lavendar[10],
    color: color.Black[80],
    borderRadius: 16,
  },
});

export default FlatHuntScreen;
