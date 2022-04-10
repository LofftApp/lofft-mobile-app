import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

// Components 🪢
import {CoreButton} from '../../components/buttons/CoreButton';
import CalendarManagement from '../../components/calendar/CalendarManagement';

const EventsManagement = ({navigation}) => {
  // Hooks
  const [date, setdate] = useState('');

  const fetchdate = dateInput => {
    setdate(dateInput);
  };

  return (
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
