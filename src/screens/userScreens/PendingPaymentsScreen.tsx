import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CustomBackButton from '../../components/CustomBackButton';
import {fontStyles} from '../../StyleSheets/FontStyleSheet';
import color from './../../assets/defaultColorPallet.json';
import PendingPaymentContainer from '../../components/PendingPaymentContainer';
import ItemPendingPaymentCard from '../../components/ItemPendingPaymentCard';

const PendingPaymentsScreen = ({navigation, route}: any) => {
  const [owed] = useState(route.params.owed);
  const [details] = useState(route.params.details);
  return (
    <View style={styles.screenContainer}>
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
  screenContainer: {
    paddingVertical: 50,
    paddingHorizontal: 15,
    backgroundColor: color.White[100],
    flex: 1,
  },
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
  textContainer: {},
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
