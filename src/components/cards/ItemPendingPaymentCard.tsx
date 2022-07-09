import React from 'react';
import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import color from '@Assets/lofftColorPallet.json';
import {fontStyles} from '@StyleSheets/FontStyleSheet';
import HalfBackgroundImage from '@Assets/banner-background-half.png';
import {CoreButton} from '@Buttons/CoreButton';

const ItemPendingPaymentCard = ({buttonAction, description, value}: any) => {
  return (
    <ImageBackground
      source={HalfBackgroundImage}
      style={styles.ItemPendingPayment}>
      <View style={styles.textContainer}>
        <Text style={[fontStyles.buttonTextSmall, styles.header]}>
          {description}
        </Text>
        <Text style={[fontStyles.headerSmall, styles.value]}>{value}</Text>
      </View>
      <CoreButton
        value="Pay this item"
        invert={true}
        style={styles.button}
        onPress={buttonAction}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  ItemPendingPayment: {
    width: '100%',
    height: 90,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: color.White[0],
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 15,
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  header: {
    marginVertical: 0,
  },
  value: {
    marginVertical: 0,
    lineHeight: 35,
  },
  button: {
    width: 158,
    height: 53,
    marginRight: 10,
  },
});

export default ItemPendingPaymentCard;
