import React from 'react';
import {View, Text, StyleSheet, Platform, ImageBackground} from 'react-native';

// Components
import HeaderBar from '../../components/HeaderBar';

// Stylesheets
import color from './../../assets/defaultColorPallet.json';
import {CoreStyleSheet} from '../../StyleSheets/CoreDesignStyleSheet';
import {fontStyles} from './../../StyleSheets/FontStyleSheet';
import paymentContainerBackground from './../../assets/paymentContainer.png';
import {CoreButton} from '../../components/CoreButton';

const CostsScreen = () => {
  return (
    <View
      style={[
        CoreStyleSheet.viewContainerStyle,
        Platform.OS === 'ios' ? CoreStyleSheet.viewContainerIOSStyle : null,
        styles.container,
      ]}>
      <HeaderBar title="Welcome" />
      <ImageBackground
        style={styles.pendingPaymentContainer}
        source={paymentContainerBackground}>
        <Text style={fontStyles.buttonTextMedium}>
          You do not currently have a Lofft
        </Text>
        <View style={styles.buttonContainer}>
          <CoreButton value="Join" style={styles.buttons} />
          <CoreButton
            value="Create"
            style={[styles.buttons, styles.mintButton]}
            onPress={() => {}}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttons: {
    width: 150,
  },
  mintButton: {
    backgroundColor: color.Mint[100],
    borderColor: color.Mint[100],
  },
  pendingPaymentContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 172,
    width: '100%',
    marginVertical: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: color.White[0],
    overflow: 'hidden',
    borderRadius: 16,
  },
});

export default CostsScreen;
