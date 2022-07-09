import React from 'react';
import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

// Assets
import Icon from 'react-native-vector-icons/Ionicons';
import color from '@Assets/lofftColorPallet.json';

// StyleSheets 🖌
import {fontStyles} from '@StyleSheets/FontStyleSheet';
import requestIcon from '@Assets/requestIcon.png';

const ActionButton = ({
  buttonColor,
  text,
  backgroundImage,
  iconName = '',
  customIcon = '',
  onPress = () => {},
}: any) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <ImageBackground source={backgroundImage} style={styles.paymentActions}>
        <View style={[styles.iconCurcleContainer]}>
          {customIcon ? (
            <Image source={requestIcon} style={[styles.requestImageSize]} />
          ) : (
            <Icon name={iconName} size={33} color={buttonColor} />
          )}
        </View>
        <Text style={[fontStyles.buttonTextSmall, styles.textButtonStyle]}>
          {text}
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  paymentActions: {
    width: 162,
    height: 122,
    overflow: 'hidden',
    borderRadius: 13,
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

export default ActionButton;
