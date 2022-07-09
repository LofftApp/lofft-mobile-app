import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

// Style Sheets
import color from '@Assets/lofftColorPallet.json';
import {fontStyles} from '@StyleSheets/FontStyleSheet';

const AlertBanner = ({alertType, message}) => {
  const type = alertType;
  return (
    <View
      style={[
        styles.notification,
        type === 'warning' ? styles.warning : styles.notification,
      ]}>
      <Text style={[fontStyles.bodyMedium, styles.notificationText]}>
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  notification: {
    width: '100%',
    padding: 15,
    borderRadius: 12,
    backgroundColor: color.Mint[80],
    marginVertical: 10,
  },
  notificationText: {
    color: color.White[100],
    textAlign: 'justify',
  },
  appNotification: {
    backgroundColor: color.Gold[80],
  },
  warning: {
    backgroundColor: color.Tomato[80],
  },
});

export default AlertBanner;
