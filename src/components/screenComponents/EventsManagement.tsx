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
  const [date, setdate] = useState('');
  const [events, setEvents] = useState([]);
  const [dates, setDates] = useState([]);
  const [todayDate] = useState(new Date());

  const fetchdate = dateInput => {
    setdate(dateInput);
  };

  useEffect(() => {
    setDates([]);
    const eventsData = async () => {
      setEvents([]);
      const allEvents = await getLofftEvents();
      setEvents(allEvents);
      setDates([]);
      allEvents.forEach(event => {
        const formattedDate = dateStringFormatter(
          new Date(event.data().date.seconds * 1000),
        );
        setDates(dates => [...dates, formattedDate]);
      });
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
      <CalendarManagement fetchdate={fetchdate} data={dates} />
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
