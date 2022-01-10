import React from 'react';
import {ImageBackground, View, Text, StyleSheet, Image} from 'react-native';
import color from './../assets/defaultColorPallet.json';
import Icon from 'react-native-vector-icons/Ionicons';
import {fontStyles} from '../StyleSheets/FontStyleSheet';
import requestIcon from './../assets/requestIcon.png';
import sendButtonBackground from './../assets/sendButtonBackground.png';
import requestButtonBackground from './../assets/requestButtonBackground.png';

const MoneyActionButton = ({requestAction = false}: any) => {
  let textValue = 'Send';
  let backgroundImage = sendButtonBackground;
  let ActionIcon = () => (
    <View style={[styles.iconCurcleContainer, styles.iconRotation]}>
      <Icon name="send-outline" size={33} color={color.Mint[100]} />
    </View>
  );

  if (requestAction) {
    textValue = 'Request';
    backgroundImage = requestButtonBackground;
    ActionIcon = () => (
      <View style={styles.iconCurcleContainer}>
        <Image source={requestIcon} style={styles.requestImageSize} />
      </View>
    );
  }

  return (
    <ImageBackground source={backgroundImage} style={styles.paymentActions}>
      <ActionIcon />
      <Text style={[fontStyles.buttonTextSmall, styles.textButtonStyle]}>
        {textValue}
      </Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  paymentActions: {
    width: 162,
    height: 122,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  iconCurcleContainer: {
    width: 57,
    height: 57,
    backgroundColor: color.White[100],
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconRotation: {
    transform: [{rotate: '-25deg'}],
  },
  requestImageSize: {
    width: 33,
    height: 33,
  },
  textButtonStyle: {
    marginVertical: 15,
  },
});

export default MoneyActionButton;
