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
import HalfBackgroundImage from './../../assets/banner-background-half.png';
import TagIcon from '../iconsAndContainers/TagIcon';

// FireStore 🔥
import {getLofftEvents} from '../../api/firebase/fireStoreActions';
import firestore from '@react-native-firebase/firestore';

// Helpers
import {
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
        timeFrom: timeFormatter(new Date(data.from.seconds * 1000)),
        timeTo: timeFormatter(new Date(data.till.seconds * 1000)),
      };
    });
    setEvents(eventsObj);
  };

  const getSelectedDate = d => {
    const date = new Date(d.dateString);
    setSelectedDate(new Date(date));
    const filtered = events.filter(f => f.date === d.dateString);
    setSelectedEvents(filtered.length > 0 ? filtered : null);
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
          <View>
            <Text style={[fontStyles.headerXtraSmall]}>04 May 2022</Text>
            <ImageBackground
              source={HalfBackgroundImage}
              style={styles.eventCard}>
              <View style={styles.contentContainer}>
                <View style={styles.headerBar}>
                  <Text style={fontStyles.buttonTextMedium}>
                    Drinks at the Park
                  </Text>
                  <TagIcon text="invited" userColor="Blue" />
                </View>
                <Text>12:00 - 19:00</Text>
                <View>
                  <Text>
                    Great drinks at the park, come join us to celebrate our
                    birthday
                  </Text>
                </View>
                <View style={styles.buttonBar}>
                  <CoreButton
                    value="Attend"
                    style={styles.buttonStyle}
                    textStyle={[
                      fontStyles.buttonTextSmall,
                      styles.buttonFontStyle,
                    ]}
                  />
                  <CoreButton
                    value="Reject"
                    style={styles.buttonStyle}
                    textStyle={[
                      fontStyles.buttonTextSmall,
                      styles.buttonFontStyle,
                    ]}
                  />
                </View>
              </View>
            </ImageBackground>
          </View>
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
