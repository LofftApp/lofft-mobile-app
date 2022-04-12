import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

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
      setEvents(await getLofftEvents());
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

    events.forEach(event => {
      const formattedDate = dateStringFormatter(
        new Date(event.data().date.seconds * 1000),
      );
      setDates(dates => [...dates, formattedDate]);
    });

    return () => subscriber();
  }, []);

  return (
    <>
      <CalendarManagement fetchdate={fetchdate} data={dates} />
      <View style={styles.buttonContainer}>
        <CoreButton
          value="Add new event"
          style={styles.button}
          invert
          onPress={() => navigation.navigate('MakeNewEvent', {date})}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginVertical: 120,
  },
  button: {
    marginVertical: 5,
  },
});

export default EventsManagement;
