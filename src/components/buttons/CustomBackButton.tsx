import React from 'react';
import {TouchableOpacity, StyleSheet, View, Text} from 'react-native';
import color from '../../assets/defaultColorPallet.json';
import Icon from 'react-native-vector-icons/Ionicons';
import {fontStyles} from '../../StyleSheets/FontStyleSheet';

const CustomBackButton = ({onPress, title = '', close = false}: any) => {
  return (
    <View
      style={[
        styles.headerContainer,
        close ? styles.headerContainClose : null,
      ]}>
      <Text
        style={[
          styles.header,
          fontStyles.buttonTextLarge,
          close ? styles.headerRight : null,
        ]}>
        {title}
      </Text>
      <TouchableOpacity
        style={[styles.button, close ? styles.closeButton : styles.backButton]}
        onPress={onPress}>
        {close ? (
          <Icon name="close" size={45} color={color.Black[50]} />
        ) : (
          <Icon name="chevron-back" size={45} color={color.Lavendar[80]} />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    alignContent: 'flex-start',
    flexDirection: 'row-reverse',
    paddingTop: 5,
  },
  headerContainClose: {
    flexDirection: 'row',
    alignContent: 'flex-end',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 48,
    height: 48,
    borderRadius: 22,
  },
  backButton: {
    backgroundColor: color.Lavendar[10],
  },
  closeButton: {
    backgroundColor: color.Black[0],
  },
  header: {
    width: '100%',
    marginLeft: -48,
    marginTop: 12,
    textAlign: 'center',
  },
  headerRight: {
    marginLeft: 0,
    marginRight: -48,
  },
});

export default CustomBackButton;
