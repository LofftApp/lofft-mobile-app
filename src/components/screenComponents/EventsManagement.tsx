import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

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
  const [firstLoad, setFirstLoad] = useState(true);
  const [userEvents, setUserEvents] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const fetchdate = dateInput => {
    console.log(dateInput);
  };

  const addEventsToDate = events => {
    let answer = [];
    events.forEach(event => {
      answer.push(
        dateStringFormatter(new Date(event.data().date.seconds * 1000)),
      );
    });
    return answer;
  };

  const createDatesObject = dates => {
    let markedDates = {};
    dates.forEach(d => {
      markedDates[d] = {marked: true};
    });

    return markedDates;
  };

  const selectTodayDateOnLoad = r => {
    let markedDates = r;
    const today = dateStringFormatter(new Date());
    if (markedDates[today]) {
      markedDates[today].selected = true;
    } else {
      markedDates[today] = {selected: true};
      setSelectedDate(today);
    }
    return markedDates;
  };

  const saveUserEvents = r => setUserEvents(r);

  useEffect(() => {
    const eventsData = async () => {
      const allEvents = await getLofftEvents();
      const dateArray = addEventsToDate(allEvents);
      const response = createDatesObject(dateArray);
      if (firstLoad) {
        const todayResponse = selectTodayDateOnLoad(response);
        await saveUserEvents(todayResponse);
        setFirstLoad(false);
      } else {
        await saveUserEvents(response);
      }
    };

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
      <CalendarManagement fetchdate={fetchdate} events={userEvents} />
      <CoreButton
        value="Add new event"
        style={styles.button}
        invert
        onPress={() => navigation.navigate('MakeNewEvent', {date})}
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
