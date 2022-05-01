import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, ScrollView} from 'react-native';

// Components 🪢
import {CoreButton} from '../../components/buttons/CoreButton';
import CalendarManagement from '../../components/calendar/CalendarManagement';

// FireStore 🔥
import {getLofftEvents} from '../../api/firebase/fireStoreActions';
import firestore from '@react-native-firebase/firestore';

// Helpers
import {dateStringFormatter} from '../../components/helperFunctions/dateFormatter';

const EventsManagement = ({navigation}) => {
  // Hooks
  const [userEvents, setUserEvents] = useState();
  const [selectedDate] = useState('2022-05-01');

  // const fetchdate = dateInput => {
  //   console.log(userEvents);
  //   console.log('==============================');
  //   let testEvents = userEvents;
  //   testEvents[dateInput].selected = true;
  //   setUserEvents(testEvents);
  //   console.log(userEvents);
  // };

  const addEventsToDate = events => {
    let answer = [];
    events.forEach(event => {
      answer.push(
        dateStringFormatter(new Date(event.data().date.seconds * 1000)),
      );
    });
    return answer;
  };

  // const createDatesObject = dates => {
  //   let markedDates = {};
  //   dates.forEach(d => {
  //     markedDates[d] = {marked: true, dotColor: 'red'};
  //   });

  //   return markedDates;
  // };

  // const selectMarkedDateOnLoad = (values, activeDate) => {
  //   let markedDates = values;
  //   const d = activeDate ? activeDate : dateStringFormatter(new Date());
  //   if (markedDates[d]) {
  //     markedDates[d].selected = true;
  //   } else {
  //     markedDates[d] = {selected: true};
  //     setSelectedDate(d);
  //   }
  //   return markedDates;
  // };

  const eventsData = async () => {
    const allEvents = await getLofftEvents();
    const dArray = addEventsToDate(allEvents);
    setUserEvents(dArray);
  };

  useEffect(() => {
    const subscriber = firestore()
      .collection('Managements')
      .doc('B7vxlFYgNpnYPOT7eMfO')
      .collection('Events')
      .onSnapshot(snapShot => {
        snapShot.docChanges().forEach(async change => {
          if (change.type === 'added' || change.type === 'removed') {
            eventsData();
          }
        });
      });
    return () => subscriber();
  }, []);
  return (
    <>
      {userEvents ? (
        <CalendarManagement events={userEvents} />
      ) : (
        <Text>Loading</Text>
      )}
      <CoreButton
        value="Add new event"
        style={styles.button}
        invert
        onPress={() => navigation.navigate('MakeNewEvent', {selectedDate})}
      />
      <ScrollView>
        <Text>There are currently no events planned for this day</Text>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: 5,
  },
});

export default EventsManagement;
