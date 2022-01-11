import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {fontStyles} from '../../StyleSheets/FontStyleSheet';
import color from './../../assets/defaultColorPallet.json';
import CustomBackButton from '../../components/CustomBackButton';
import Icon from 'react-native-vector-icons/Ionicons';

const PaidConfirmationScreen = ({navigation, route}: any) => {
  const [recipient] = useState(route.params.recipient);
  const [message] = useState(`We'll let ${recipient} know that you've paid`);
  return (
    <View style={styles.screenContainer}>
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
