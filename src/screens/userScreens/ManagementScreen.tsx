// React ⚛
import React, {useState, useEffect, useCallback} from 'react';

// React Native 📱
import {View, Platform, SafeAreaView, ScrollView} from 'react-native';

// Components 🪢
import HeaderBar from '../../components/bannersAndBars/HeaderBar';
import ToggleBar from './../../components/bannersAndBars/ToggleBar';
import PollsManagement from '../../components/screenComponents/PollsManagement';
import EventsManagement from '../../components/screenComponents/EventsManagement';

// StyleSheets 🌈
import {CoreStyleSheet} from '../../StyleSheets/CoreDesignStyleSheet';

// FireStore 🔥
import {getLofftPolls} from '../../api/firebase/fireStoreActions';
import firestore from '@react-native-firebase/firestore';

const ManagementScreen = ({navigation}: any) => {
  // User Hooks
  const [image, setImage]: any = useState('');
  // Hooks
  const [calendarActive, setCalendarActive] = useState(true);
  const [polls, setPolls] = useState([]);
  const [pastPolls, setPastPolls] = useState([]);
  const [todayDate] = useState(new Date());

  const buttonToggle = useCallback(toggled => {
    setCalendarActive(toggled);
  }, []);

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
            optionA="Calendar"
            optionB="Polls"
            dashboard={buttonToggle}
          />

          {calendarActive ? (
            <EventsManagement navigation={navigation} />
          ) : (
            <PollsManagement
              navigation={navigation}
              pastPolls={pastPolls}
              polls={polls}
            />
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default ManagementScreen;
