import React, {useState} from 'react';

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
import {CoreButton} from '../../components/buttons/CoreButton';

// Stylesheets
import color from './../../assets/defaultColorPallet.json';
import {CoreStyleSheet} from '../../StyleSheets/CoreDesignStyleSheet';
import {fontStyles} from './../../StyleSheets/FontStyleSheet';
import {navigationRef as navigation} from './../../RootNavigation';
import HeaderBarFlatHunt from '../../components/bannersAndBars/HeaderBarFlatHunt';

const FlatHuntScreen = () => {
  const [image, setImage]: any = useState('');
  const [city, setCity]: any = useState('');

  return (
    <View
      style={[
        CoreStyleSheet.viewContainerStyle,
        Platform.OS === 'ios' ? CoreStyleSheet.viewContainerIOSStyle : null,
      ]}>
      <SafeAreaView>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}>
          <HeaderBarFlatHunt onPress={() => navigation.goBack()} />
        <View style={styles.container}>
            <Text style={fontStyles.headerMedium}>Looking for a new Home?</Text>
        </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  headerBar: {
    display: 'flex',
    flexDirection: 'row'
  }
});

export default FlatHuntScreen;
