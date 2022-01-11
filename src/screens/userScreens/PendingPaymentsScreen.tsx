import React, {useState} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';

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
  const [details] = useState(route.params.details);
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
      {details.map((item: any) => (
        <ItemPendingPaymentCard
          key={item.id}
          value={item.value}
          description={item.description}
          buttonAction={() =>
            navigation.navigate('MakePayment', {billDetails: item})
          }
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  ItemPendingPayment: {
    width: '100%',
    height: 88,
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
