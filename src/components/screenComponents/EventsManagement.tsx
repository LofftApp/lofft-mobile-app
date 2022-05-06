import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, ScrollView} from 'react-native';

// Components 🪢
import {CoreButton} from '../../components/buttons/CoreButton';
import CalendarManagement from '../../components/calendar/CalendarManagement';
import EventsCard from '../cards/EventsCard';

// FireStore 🔥
import {getLofftEvents} from '../../api/firebase/fireStoreActions';
import firestore from '@react-native-firebase/firestore';

// Helpers
import {
  fullDateFormatter,
  dateStringFormatter,
  timeFormatter,
} from '../../components/helperFunctions/dateFormatter';

// Styles
import {fontStyles} from '../../StyleSheets/FontStyleSheet';
import color from '../../assets/defaultColorPallet.json';

const EventsManagement = ({navigation}) => {
  // Hooks
  const [userEventsDates, setUserEventsDates] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [formattedSelectedDate, setFormattedSelectedDate] = useState(
    dateStringFormatter(selectedDate),
  );
  const [events, setEvents] = useState(null);
  const [selectedEvent, setSelectedEvents] = useState(null);
  const [fullDate, setFullDate] = useState(null);
  const addEventsToDate = events => {
    let answer = [];
    events.forEach(event => {
      answer.push(
        dateStringFormatter(new Date(event.data().date.seconds * 1000)),
      );
    });
    return answer;
  };

  const setDates = d => {
    setSelectedDate(d);
    setFormattedSelectedDate(dateStringFormatter(d));
  };

  const eventsData = async () => {
    const allEvents = await getLofftEvents();
    const dArray = addEventsToDate(allEvents);
    dArray ? setUserEventsDates(dArray) : setUserEventsDates([]);

    const eventsObj = allEvents.map(e => {
      const data = e.data();
      const uid = e.id;
      return {
        uid,
        title: data.title,
        description: data.description,
        location: data.location,
        invited: data.invited,
        attending: data.attending,
        notAttending: data.notAttending,
        date: dateStringFormatter(new Date(data.date.seconds * 1000)),
        fromTime: timeFormatter(new Date(data.from.seconds * 1000)),
        toTime: timeFormatter(new Date(data.till.seconds * 1000)),
        createdBy: data.createdBy,
        active: data.active,
      };
    });
    setEvents(eventsObj);
  };

  const getSelectedDate = d => {
    if (selectedDate && d.dateString === dateStringFormatter(selectedDate)) {
      setSelectedDate(null);
      setFormattedSelectedDate(null);
      setSelectedEvents(null);
    } else {
      const date = new Date(d.dateString);
      setDates(date);
      // setSelectedDate(date);
      // setFormattedSelectedDate(date);
      setFullDate(fullDateFormatter(date));
      const filtered = events.filter(f => f.date === d.dateString);
      setSelectedEvents(filtered.length > 0 ? filtered : null);
    }
  };

  useEffect(() => {
    eventsData();
    const subscriber = firestore()
      .collection('Managements')
      .doc('B7vxlFYgNpnYPOT7eMfO')
      .collection('Events')
      .onSnapshot(snapShot => {
        snapShot.docChanges().forEach(() => {
          eventsData();
        });
      });
    return () => subscriber();
  }, []);

  console.log(dateStringFormatter(selectedDate));
  return (
    <>
      {userEventsDates ? (
        <CalendarManagement
          events={userEventsDates}
          getSelectedDate={getSelectedDate}
        />
      ) : (
        <Text>Loading...</Text>
      )}
      <CoreButton
        value="Add new event"
        style={styles.button}
        invert
        onPress={() =>
          navigation.navigate('MakeNewEvent', {
            selectedDate: formattedSelectedDate,
          })
        }
      />
      <ScrollView>
        {selectedEvent ? (
          <>
            <Text style={[fontStyles.headerXtraSmall]}>{fullDate}</Text>
            {selectedEvent.map(e => {
              return <EventsCard key={e} event={e} />;
            })}
          </>
        ) : (
          <Text>There are currently no events planned for this day</Text>
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: 5,
  },
  eventCard: {
    width: '100%',
    borderWidth: 1,
    borderColor: color.White[0],
    borderRadius: 8,
    overflow: 'hidden',
    minHeight: 75,
  },
  contentContainer: {
    padding: 10,
  },
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  buttonStyle: {
    width: 75,
    height: 30,
    marginHorizontal: 5,
  },
  buttonFontStyle: {
    color: color.White[100],
  },
});

export default EventsManagement;
