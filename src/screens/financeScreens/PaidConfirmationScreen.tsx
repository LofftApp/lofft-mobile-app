import React, {useState} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// StyleSheets
import color from '@Assets/lofftColorPallet.json';
import {fontStyles} from '@StyleSheets/FontStyleSheet';
import {CoreStyleSheet} from '@StyleSheets/CoreDesignStyleSheet';

// Components
import CustomBackButton from '@Buttons/CustomBackButton';

const PaidConfirmationScreen = ({navigation, route}: any) => {
  const [recipient] = useState(route.params.recipient);
  const [message] = useState(`We'll let ${recipient} know that you've paid`);
  return (
    <View
      style={[
        CoreStyleSheet.viewContainerStyle,
        Platform.OS === 'ios' ? CoreStyleSheet.viewContainerIOSStyle : null,
      ]}>
      <CustomBackButton
        onPress={() => navigation.navigate('Costs')}
        title="Payment"
        close
      />
      <View style={styles.pageContainer}>
        <Icon
          style={{marginLeft: 3}}
          name="checkmark-circle"
          size={112}
          color={color.Mint[100]}
        />
        <Text style={[fontStyles.buttonTextLarge, styles.subHeader]}>
          Thanks for the Payment!
        </Text>
        <Text style={fontStyles.bodyMedium}>{message}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    paddingVertical: 50,
    paddingHorizontal: 15,
    backgroundColor: color.White[100],
    flex: 1,
  },
  pageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subHeader: {
    marginVertical: 20,
  },
});

export default PaidConfirmationScreen;
