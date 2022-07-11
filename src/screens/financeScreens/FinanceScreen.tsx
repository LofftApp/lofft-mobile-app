import React, {useState, useEffect, useCallback} from 'react';
import {Pressable, View, Text, StyleSheet, Platform} from 'react-native';

// Fierstore 🔥
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// StyleSheets 🖌
import * as color from '@Assets/lofftColorPallet.json';
import {CoreStyleSheet} from '@StyleSheets/CoreDesignStyleSheet';
import {fontStyles} from '@StyleSheets/FontStyleSheet';

// Components 🪢
import RootPage from '@Pages/RootPage';
import HeaderBar from '@Bars/HeaderBar';
import ActionButton from '@Buttons/ActionButton';
import PendingPaymentContainer from '@Containers/PendingPaymentContainer';
import ZeroPendingPaymentsContainer from '@Containers/ZeroPendingPayments';
import ToggleBar from '@Bars/ToggleBar';

// Assets 🖼
import sendButtonBackground from '@Assets/sendButtonBackground.png';
import requestButtonBackground from '@Assets/requestButtonBackground.png';
import requestIcon from '@Assets/requestIcon.png';

// API Interactions
// import {my_bills} from './../../context/BillsQuery';
import {billQuery} from '@Firebase/fireStoreActions';

import TestChartWeek from '@Charts/TestChartWeek';
import TestChartMonth from '@Charts/TestChartMonth';
import TestChartYear from '@Charts/TestChartYear';

const FinanceScreen = ({navigation}: any) => {
  const [owed, setOwed] = useState(0);

  // Chart Options
  const [week, setWeekSelected] = useState(true);
  const [month, setMonthSelected] = useState(false);
  const [year, setYearSelected] = useState(false);

  const [image, setImage]: any = useState('');
  const [bills, setBills] = useState({});

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      if (user) {
        const subscriber = firestore()
          .collection('Users')
          .where('uid', '==', user.uid)
          .onSnapshot(snapShot => {
            let amountOwed = 0;
            const result = snapShot.docs[0].data();
            if (result.imageURI) setImage({uri: result.imageURI});
            if (result.outstanding_bills) {
              const userBills = result.outstanding_bills;
              setBills(userBills);
              userBills.forEach(bill => {
                if (!bill.paid) {
                  amountOwed += Number(bill.value);
                }
              });
              setOwed(amountOwed);
            }
          });
        return () => subscriber();
      } else {
        console.log('Unauth');
      }
    });
  }, []);

  const handleWeekClick = () => {
    setWeekSelected(true);
    setMonthSelected(false);
    setYearSelected(false);
  };

  const handleMonthClick = () => {
    setMonthSelected(true);
    setWeekSelected(false);
    setYearSelected(false);
  };

  const handleYearClick = () => {
    setYearSelected(true);
    setWeekSelected(false);
    setMonthSelected(false);
  };

  let chart: any;

  if (week) {
    chart = <TestChartWeek />; // Pass Props! So far only dummy data
  } else if (month) {
    chart = <TestChartMonth />; // Pass Props! So far only dummy data
  } else if (year) {
    chart = <TestChartYear />; // Pass Props! So far only dummy data
  }
  const [isDashboard, setIsDashboard] = useState(true);
  const dashboardToggle = useCallback(toggled => {
    setIsDashboard(toggled);
  }, []);

  return (
    <RootPage name="Your Finances" image={image}>
      <ToggleBar
        optionA="Dashboard"
        optionB="History"
        dashboard={dashboardToggle}
      />
      {isDashboard ? (
        <>
          {owed === 0 ? (
            <ZeroPendingPaymentsContainer />
          ) : (
            <PendingPaymentContainer
              buttonValue="Pay now"
              buttonAction={() => {
                navigation.navigate('PendingPayments', {owed, bills});
              }}
              owed={owed}
            />
          )}

          <View style={styles.moneyActionContainer}>
            <ActionButton
              text="Send"
              backgroundImage={sendButtonBackground}
              iconName="send-outline"
              buttonColor={color.Mint[100]}
            />
            <ActionButton
              text="Request"
              backgroundImage={requestButtonBackground}
              customIcon={requestIcon}
            />
          </View>
          <View style={styles.chartPillContainer}>
            <Text style={fontStyles.buttonTextLarge}>Your Stats</Text>
            <View style={styles.chartPillMenu}>
              <View style={styles.selectChartContainer}>
                <Pressable
                  style={
                    week ? styles.activeChartPill : styles.inActiveChartPill
                  }
                  onPress={() => handleWeekClick()}>
                  <Text
                    style={
                      week ? styles.activeChartText : styles.inactiveChartText
                    }>
                    Week
                  </Text>
                </Pressable>
                <Pressable
                  style={
                    month ? styles.activeChartPill : styles.inActiveChartPill
                  }
                  onPress={() => handleMonthClick()}>
                  <Text
                    style={
                      month ? styles.activeChartText : styles.inactiveChartText
                    }>
                    Month
                  </Text>
                </Pressable>
                <Pressable
                  style={
                    year ? styles.activeChartPill : styles.inActiveChartPill
                  }
                  onPress={() => handleYearClick()}>
                  <Text
                    style={
                      year ? styles.activeChartText : styles.inactiveChartText
                    }>
                    Year
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
          {chart}
        </>
      ) : (
        // Dashboard Toggle Tenerary !!!!
        <View style={styles.historyContainer}>
          <Text style={[fontStyles.buttonTextLarge, styles.historyTextTemp]}>
            Ah Bummer, you dont have any payment history yet {'\n'}👾 👾 👾
          </Text>
        </View>
      )}
    </RootPage>
  );
};

const styles = StyleSheet.create({
  historyContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 200,
  },
  historyTextTemp: {
    textAlign: 'center',
  },
  pendingPaymentContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 172,
    marginVertical: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: color.White[0],
    overflow: 'hidden',
    borderRadius: 16,
  },
  paynowButton: {
    width: 119,
    height: 53,
  },

  moneyActionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chartPillContainer: {
    marginTop: 20,
    zIndex: 1,
  },
  chartPillMenu: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  selectChartContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 210,
  },
  activeChartPill: {
    backgroundColor: color.Lavendar[10],
    padding: 10,
    borderRadius: 15,
    color: color.Lavendar[80],
  },
  inActiveChartPill: {
    padding: 10,
    borderRadius: 15,
  },
  activeChartText: {
    color: color.Lavendar[100],
    fontWeight: 'bold',
  },
  inactiveChartText: {
    color: color.Lavendar[30],
    fontWeight: 'bold',
  },
});

export default FinanceScreen;
