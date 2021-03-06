import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
// StyleSheets
import color from '@Assets/lofftColorPallet.json';
import {CoreStyleSheet} from '@StyleSheets/CoreDesignStyleSheet';
import {fontStyles} from '@StyleSheets/FontStyleSheet';

// Components
import CustomBackButton from '@Buttons/CustomBackButton';
import UserIcon from '@Icons/UserIcon';
import PaymentCard from '@Cards/PaymentCard';
import {CoreButton} from '@Buttons/CoreButton';

// Firebase
import {getUser} from '@Firebase/firebaseApi';

const MakePayment = ({navigation, route}: any) => {
  const [billDetails] = useState(route.params.billDetails);
  const [paymentMethod, setPaymentMethod] = useState('Manual payment');
  const [userName, setUserName] = useState('');
  const [userCards, setUserCards] = useState([]);

  useEffect(() => {
    const getUserName = async () => {
      const user = await getUser(billDetails.recipients);
      // setUserName(user.name);
    };

    // const grabUserCards = async () => {
    //   const user: any = await getCurrentUserDetails(user);
    //   if ('cards' in user) {
    //     const checkedCards = user.cards.filter(card => card.checked);
    //     setUserCards(checkedCards);
    //   } else {
    //     // Nothing going on here
    //   }
    // };
    getUserName();
    // grabUserCards();
  }, []);

  console.log(userCards.length);

  useEffect(() => {}, []);

  return (
    <View
      style={[
        CoreStyleSheet.viewContainerStyle,
        Platform.OS === 'ios' ? CoreStyleSheet.viewContainerIOSStyle : null,
      ]}>
      <CustomBackButton
        onPress={() => navigation.goBack()}
        title={billDetails.title}
      />

      {/* <PaymentCard navigation={navigation} /> */}
      {/* {userCards.length > 0 ? <ActiveCard userCards={userCards} /> : <PaymentCard navigation={navigation} />} */}
      {userCards.length > 0 ? (
        <MyCarousel userCards={userCards} />
      ) : (
        <PaymentCard navigation={navigation} />
      )}
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
          <Text style={fontStyles.buttonTextMedium}>Change Me</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <CoreButton
          value="See Summary"
          style={styles.button}
          onPress={() =>
            navigation.navigate('BillOverview', {
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
