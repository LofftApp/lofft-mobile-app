// React ⚛
import React, {useState, useEffect, useCallback} from 'react';

// React Native 📱
import {
  View,
  Text,
  StyleSheet,
  Platform,
  SafeAreaView,
  ScrollView,
} from 'react-native';

// Components 🪢
import HeaderBar from '../../components/bannersAndBars/HeaderBar';
import ToggleBar from './../../components/bannersAndBars/ToggleBar';
import CalendarManagement from '../../components/calendar/CalendarManagement';
import {CoreButton} from '../../components/buttons/CoreButton';
import PollsManagement from '../../components/screenComponents/PollsManagement';

// StyleSheets 🌈
import {CoreStyleSheet} from '../../StyleSheets/CoreDesignStyleSheet';
import {fontStyles} from '../../StyleSheets/FontStyleSheet';
import color from '../../assets/defaultColorPallet.json';

// FireStore 🔥
import {getLofftPolls} from '../../api/firebase/fireStoreActions';
import firestore from '@react-native-firebase/firestore';

const ManagementScreen = ({navigation}: any) => {
  // User Hooks
  const [image, setImage]: any = useState('');
  // Hooks
  const [pollsactivated, setPollsactivated] = useState(true);
  const [date, setdate] = useState('');
  const [polls, setPolls] = useState([]);
  const [pastPolls, setPastPolls] = useState([]);
  const [todayDate] = useState(new Date());

  const buttonToggle = useCallback(toggled => {
    setPollsactivated(toggled);
  }, []);

  const fetchdate = dateInput => {
    setdate(dateInput);
  };

  useEffect(() => {
    const pollsData = async () => {
      setPolls([]);
      const allPolls = await getLofftPolls();
      const currentPolls = allPolls.filter(
        poll =>
          (poll.data().deadline &&
            new Date(poll.data().deadline.seconds * 1000) > todayDate) ||
          !poll.data().deadline,
      );
      const oldPolls = allPolls.filter(
        poll =>
          poll.data().deadline &&
          new Date(poll.data().deadline.seconds * 1000) < todayDate,
      );
      setPolls(currentPolls);
      setPastPolls(oldPolls);
    };

    const subscriber = firestore()
      .collection('Managements')
      .doc('B7vxlFYgNpnYPOT7eMfO')
      .collection('Polls')
      .onSnapshot(snapShot => {
        snapShot.docChanges().forEach(async change => {
          if (change.type === 'added' || change.type === 'removed') {
            pollsData();
            console.log(change.type);
          }
        });
      });
    return () => subscriber();
  }, []);

  return (
    <View
      style={[
        CoreStyleSheet.viewContainerStyle,
        Platform.OS === 'ios' ? CoreStyleSheet.viewContainerIOSStyle : null,
      ]}>
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <HeaderBar title="Management" image={image} />

          <ToggleBar
            optionA="Polls"
            optionB="Flat's calendar"
            dashboard={buttonToggle}
          />

          {pollsactivated ? (
            <PollsManagement
              navigation={navigation}
              pastPolls={pastPolls}
              polls={polls}
            />
          ) : (
            <>
              <CalendarManagement fetchdate={fetchdate} />
              <View style={styles.buttonContainer}>
                <CoreButton
                  value="Add new event"
                  style={styles.button}
                  invert
                  onPress={() => navigation.navigate('MakeNewEvent', {date})}
                />
              </View>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ManagementScreen;
