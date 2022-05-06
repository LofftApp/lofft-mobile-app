import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  ScrollView,
} from 'react-native';
import moment from 'moment';

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
  const [userEventsDates, setUserEventsDates] = useState();
  const [selectedDate, setSelectedDate] = useState(new Date());
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

  const eventsData = async () => {
    const allEvents = await getLofftEvents();
    const dArray = addEventsToDate(allEvents);
    setUserEventsDates(dArray);
    const eventsObj = allEvents.map(e => {
      const data = e.data();
      return {
        title: data.title,
        description: data.description,
        location: data.location,
        date: dateStringFormatter(new Date(data.date.seconds * 1000)),
        fromTime: timeFormatter(new Date(data.from.seconds * 1000)),
        toTime: timeFormatter(new Date(data.till.seconds * 1000)),
      };
    });
    setEvents(eventsObj);
  };

  const getSelectedDate = d => {
    if (selectedDate && d.dateString === dateStringFormatter(selectedDate)) {
      setSelectedDate(null);
      setSelectedEvents(null);
    } else {
      const date = new Date(d.dateString);
      // console.log(dateStringFormatter(date));
      setSelectedDate(date);
      setFullDate(fullDateFormatter(date));
      const filtered = events.filter(f => f.date === d.dateString);
      setSelectedEvents(filtered.length > 0 ? filtered : null);
    }
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
      {userEventsDates ? (
        <CalendarManagement
          events={userEventsDates}
          getSelectedDate={getSelectedDate}
        />
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
        {selectedEvent ? (
          <>
            <Text style={[fontStyles.headerXtraSmall]}>{fullDate}</Text>
            {selectedEvent.map(e => {
              return (
                <EventsCard
                  key={e}
                  title={e.title}
                  description={e.description}
                  fromTime={e.fromTime}
                  toTime={e.toTime}
                />
              );
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
