import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';

// StyleSheets
import color from './../../assets/defaultColorPallet.json';
import {fontStyles} from '../../StyleSheets/FontStyleSheet';
import {CoreStyleSheet} from '../../StyleSheets/CoreDesignStyleSheet';

// Components
import PendingPaymentContainer from '../../components/iconsAndContainers/PendingPaymentContainer';
import ItemPendingPaymentCard from '../../components/cards/ItemPendingPaymentCard';
import CustomBackButton from '../../components/buttons/CustomBackButton';

// Firebase
import getAuth from '@react-native-firebase/auth';

const PendingPaymentsScreen = ({navigation, route}: any) => {
  const [owed] = useState(route.params.owed);
  const [details] = useState(route.params.bills);

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
        !item.paid ? (
          <ItemPendingPaymentCard
            key={item.title}
            value={`${item.value} €`}
            description={item.title}
            buttonAction={() =>
              navigation.navigate('MakePayment', {
                billDetails: item,
              })
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
