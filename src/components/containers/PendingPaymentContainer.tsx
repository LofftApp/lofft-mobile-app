import React from 'react';
import {Text, ImageBackground, StyleSheet} from 'react-native';
import color from '@Assets/lofftColorPallet.json';
import paymentContainerBackground from '@Assets/paymentContainer.png';
import {fontStyles} from '@StyleSheets/FontStyleSheet';
import {CoreButton} from '@Buttons/CoreButton';

const PendingPaymentContainer = ({buttonAction, buttonValue, owed}: any) => {
  return (
    <ImageBackground
      style={styles.pendingPaymentContainer}
      source={paymentContainerBackground}>
      <Text style={fontStyles.buttonTextSmall}>Total pending payment:</Text>
      <Text style={fontStyles.headerMedium}>{`${owed} €`}</Text>
      <CoreButton
        value={buttonValue}
        style={styles.paynowButton}
        onPress={buttonAction}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  pendingPaymentContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 172,
    marginVertical: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: color.White[0],
    overflow: 'hidden',
    borderRadius: 16,
  },
  paynowButton: {
    width: 119,
    height: 53,
  },
});

export default PendingPaymentContainer;
