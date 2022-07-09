import React from 'react';
import {ImageBackground, Text, StyleSheet} from 'react-native';

// StyleSheets 🖌
import {fontStyles} from '@StyleSheets/FontStyleSheet';

// Assets 🖼
import color from '@Assets/lofftColorPallet.json';
import bannerBackgroundHalf from '@Assets/banner-background-half.png';

const ZeroPendingPaymentsContainer = () => {
  return (
    <ImageBackground source={bannerBackgroundHalf} style={styles.container}>
      <Text style={[fontStyles.bodyMedium, styles.textStyle]}>
        Currently you have no pending payments
      </Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    height: 86,
    alignItems: 'center',
    marginVertical: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: color.White[0],
    overflow: 'hidden',
    borderRadius: 12,
  },
  textStyle: {
    color: color.Lavendar[100],
  },
});

export default ZeroPendingPaymentsContainer;
