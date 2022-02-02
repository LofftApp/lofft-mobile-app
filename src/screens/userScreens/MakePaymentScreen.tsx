/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import {getUser} from '../../api/firebase/firebaseApi';

// StyleSheets
import color from './../../assets/defaultColorPallet.json';
import {CoreStyleSheet} from '../../StyleSheets/CoreDesignStyleSheet';
import {fontStyles} from '../../StyleSheets/FontStyleSheet';

// Components
import CustomBackButton from '../../components/CustomBackButton';
import UserIcon from '../../components/UserIcon';
import PaymentCard from '../../components/PaymentCard';
import {CoreButton} from '../../components/CoreButton';

// Assets
import userImage from '../../assets/user.jpeg';

const MakePayment = ({navigation, route}: any) => {
  const [billDetails] = useState(route.params.billDetails);
  const [payer] = useState(route.params.payer);
  const [paymentMethod, setPaymentMethod] = useState('Manual payment');
  const [userName, setUserName] = useState('');

  const getUserName = async () => {
    const user = await getUser(billDetails.payer);
    setUserName(user.name);
  };
  getUserName();
  return (
    <View
      style={[
        CoreStyleSheet.viewContainerStyle,
        Platform.OS === 'ios' ? CoreStyleSheet.viewContainerIOSStyle : null,
      ]}>
      <CustomBackButton
        onPress={() => navigation.goBack()}
        title="Make a payment"
      />
      <PaymentCard navigation={navigation} />
      <Text style={[styles.subHeader, fontStyles.buttonTextLarge]}>
        Recipients
      </Text>
      <View style={styles.userDetails}>
        <UserIcon
          image={userImage}
          userIconStyle={styles.userIcon}
          userImageContainerStyle={styles.userImageContainer}
          userImageStyle={styles.userImage}
        />
        <Text style={[styles.userText, fontStyles.buttonTextMedium]}>
          {userName.split(' ')[0]}
        </Text>
        <View style={styles.moneyPill}>
          <Text style={fontStyles.buttonTextMedium}>{payer.value}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <CoreButton
          value="See Summary"
          style={styles.button}
          onPress={() =>
            navigation.navigate('ConfirmPayment', {
              recipient: userName,
              billDetails: billDetails,
              paymentMethod: paymentMethod,
            })
          }
        />
        <CoreButton
          value="Cancel"
          style={styles.button}
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
  userImageContainer: {
    width: 75,
    height: 75,
    borderWidth: 0,
  },
  userImage: {
    width: 75,
    height: 75,
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
