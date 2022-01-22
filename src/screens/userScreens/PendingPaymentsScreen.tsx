import React, {useState} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import getAuth from '@react-native-firebase/auth';

// StyleSheets
import color from './../../assets/defaultColorPallet.json';
import {fontStyles} from '../../StyleSheets/FontStyleSheet';
import {CoreStyleSheet} from '../../StyleSheets/CoreDesignStyleSheet';

// Components
import PendingPaymentContainer from '../../components/PendingPaymentContainer';
import ItemPendingPaymentCard from '../../components/ItemPendingPaymentCard';
import CustomBackButton from '../../components/CustomBackButton';

const PendingPaymentsScreen = ({navigation, route}: any) => {
  const [owed] = useState(route.params.owed);
  const [details] = useState(route.params.billDetails);
  const currentUser = getAuth().currentUser.uid;
  return (
    <View
      style={[
        CoreStyleSheet.viewContainerStyle,
        Platform.OS === 'ios' ? CoreStyleSheet.viewContainerIOSStyle : null,
      ]}>
      <CustomBackButton
        onPress={() => navigation.goBack()}
        title="Pending payments"
      />
      <PendingPaymentContainer
        buttonValue="Pay all"
        buttonAction={() => navigation.navigate('PayNow')}
        owed={owed}
      />
      <Text style={[styles.subHeader, fontStyles.buttonTextLarge]}>
        Pay per item
      </Text>
      {details.map((item: any) =>
        !item.payees[currentUser].paid ? (
          <ItemPendingPaymentCard
            key={item.payees[currentUser].id}
            value={item.payees[currentUser].value}
            description={item.title}
            buttonAction={() =>
              navigation.navigate('MakePayment', {billDetails: item})
            }
          />
        ) : null,
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  ItemPendingPayment: {
    width: '100%',
    minHeight: 88,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: color.White[0],
    borderRadius: 16,
    overflow: 'hidden',
  },
  subHeader: {
    marginBottom: 15,
    marginLeft: 3,
  },
  button: {
    width: 158,
    height: 53,
  },
});

export default PendingPaymentsScreen;
