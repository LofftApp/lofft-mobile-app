import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CustomBackButton from '../../components/CustomBackButton';
import {fontStyles} from '../../StyleSheets/FontStyleSheet';
import color from './../../assets/defaultColorPallet.json';
import UserIcon from '../../components/UserIcon';
import userImage from '../../assets/user.jpeg';
import PaymentCard from '../../components/PaymentCard';
import {CoreButton} from '../../components/CoreButton';

const MakePayment = ({navigation, route}: any) => {
  const [billDetails] = useState(route.params.billDetails);
  const [paymentMethod, setPaymentMethod] = useState('Manual payment');
  return (
    <View style={styles.screenContainer}>
      <CustomBackButton
        onPress={() => navigation.goBack()}
        title="Make a payment"
      />
      <PaymentCard />
      <Text style={[styles.subHeader, fontStyles.buttonTextLarge]}>
        Recipients
      </Text>
      <View style={styles.userDetails}>
        <UserIcon
          image={userImage}
          userIconStyle={styles.userIcon}
          userImageStyle={styles.userImage}
        />
        <Text style={[styles.userText, fontStyles.buttonTextMedium]}>
          {billDetails.recipient.first_name}
        </Text>
        <View style={styles.moneyPill}>
          <Text style={fontStyles.buttonTextMedium}>{billDetails.value}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <CoreButton
          value="See Summary"
          userStyle={styles.button}
          onPress={() =>
            navigation.navigate('ConfirmPayment', {
              billDetails: billDetails,
              paymentMethod: paymentMethod,
            })
          }
        />
        <CoreButton
          value="Cancel"
          userStyle={styles.button}
          invert
          onPress={() => navigation.navigate('Costs')}
        />
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
  subHeader: {
    marginBottom: 15,
    marginLeft: 3,
  },
  userDetails: {
    width: 120,
    alignItems: 'center',
  },
  userIcon: {
    width: 96,
    height: 96,
    marginVertical: 5,
    backgroundColor: color.Lavendar[50],
  },
  userImage: {
    width: 75,
    height: 75,
    borderWidth: 0,
  },
  userText: {
    marginVertical: 5,
  },
  moneyPill: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 112,
    height: 53,
    backgroundColor: color.Lavendar[10],
    borderRadius: 8,
    marginTop: 15,
  },
  buttonContainer: {
    marginVertical: 30,
  },
  button: {
    marginVertical: 5,
  },
});

export default MakePayment;
