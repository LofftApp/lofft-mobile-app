import React, {useState, useEffect, useCallback} from 'react';
import {Pressable, View, Text, StyleSheet, Platform} from 'react-native';
import {fontStyles} from './../../StyleSheets/FontStyleSheet';
import color from './../../assets/defaultColorPallet.json';

// Components
import MoneyActionButton from './../../components/MoneyActionButton';
import PendingPaymentContainer from './../../components/PendingPaymentContainer';

// Image
import userImage from './../../assets/user.jpeg';

// API Interactions
import {my_bills} from './../../context/BillsQuery';

import TestChartWeek from './../../components/charts/TestChartWeek';
import TestChartMonth from './../../components/charts/TestChartMonth';
import TestChartYear from './../../components/charts/TestChartYear';

import UserIcon from './../../components/UserIcon';
import ToggleBar from './../../components/ToggleBar';

const DashboardScreen = ({navigation}: any) => {
  const [owed, setOwed] = useState(0);

  // Chart Options
  const [week, setWeekSelected] = useState(true);
  const [month, setMonthSelected] = useState(false);
  const [year, setYearSelected] = useState(false);

  const [billDetails, setBillDetails] = useState([]);

  const setValueOwed = async () => {
    const userData = await my_bills();

    let total: number = 0;
    let data: any = [];
    userData.map((item: any) => {
      if (!item.accepted) {
        total = total + item.value;
        data.push({
          id: item.id,
          name: item.bill.name,
          description: item.bill.description,
          value: item.value,
          recipient: {
            id: item.recipient.id,
            first_name: item.recipient.first_name,
          },
        });
      }
    });
    setBillDetails(data);
    setOwed(total.toFixed(2));
  };

  useEffect(() => {
    setValueOwed();
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
    <View
      style={[
        styles.viewContainerStyle,
        Platform.OS === 'ios' ? styles.viewContainerIOSStyle : null,
      ]}>
      <View style={styles.headerContainer}>
        <Text style={fontStyles.headerMedium}>Your Finances</Text>
        <UserIcon image={userImage} />
      </View>
      <ToggleBar dashboard={dashboardToggle} />
      {isDashboard ? (
        <>
          <PendingPaymentContainer
            buttonValue="Pay now"
            buttonAction={() => {
              navigation.navigate('PayNow', {
                owed: owed,
                details: billDetails,
              });
            }}
            owed={owed}
          />

          <View style={styles.moneyActionContainer}>
            <MoneyActionButton />
            <MoneyActionButton requestAction={true} />
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
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainerStyle: {
    backgroundColor: color.White[100],
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 15,
  },
  viewContainerIOSStyle: {
    paddingTop: 65,
  },
  headerContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  userIcon: {
    width: 45,
    height: 45,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: color.Lavendar[100],
    resizeMode: 'contain',
  },
  backgroundCurcle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 64,
    height: 64,
    borderRadius: 50,
    backgroundColor: color.Lavendar[10],
  },
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

export default DashboardScreen;
