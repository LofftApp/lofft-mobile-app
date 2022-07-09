import React from 'react';
import {ImageBackground, StyleSheet} from 'react-native';
import color from '@Assets/lofftColorPallet.json';
import paymentContainerBackground from '@Assets/paymentContainer.png';
import {CoreButton} from '@Buttons/CoreButton';

const NewPollContainer = ({buttonAction, buttonValue}) => {
  return (
    <ImageBackground
      style={styles.newPollContainer}
      source={paymentContainerBackground}>
      <CoreButton
        value={buttonValue}
        style={styles.createPoll}
        onPress={buttonAction}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  newPollContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    marginVertical: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: color.White[0],
    overflow: 'hidden',
    borderRadius: 16,
  },
  createPoll: {
    width: 179,
    height: 53,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NewPollContainer;
