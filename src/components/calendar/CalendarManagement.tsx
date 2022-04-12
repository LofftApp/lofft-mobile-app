import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

const headerFont700 = 'Montserrat-Bold';
const headerFont600 = 'Montserrat-SemiBold';
const ButtonFont = 'Roboto-Bold';
const bodyFont = 'Roboto';

// StyleSheets
import color from './../../assets/defaultColorPallet.json';
import {CoreStyleSheet} from '../../StyleSheets/CoreDesignStyleSheet';
import {fontStyles} from './../../StyleSheets/FontStyleSheet';
import {useState} from 'react';

const CalendarManagement = ({fetchdate, data = []}) => {
  console.log(data);
  const [date, setdate] = useState({});

  const getSelectedDayEvents = date => {
    let markedDate = {};
    markedDate[date] = {selected: true};
    setdate(markedDate);
  };

  return (
    <Calendar
      disableMonthChange={true}
      theme={{
        backgroundColor: '#ffffff',
        calendarBackground: '#ffffff',
        textSectionTitleColor: 'black',
        textSectionTitleDisabledColor: '#d9e1e8',
        selectedDayBackgroundColor: '#724EFA',
        selectedDayTextColor: '#ffffff',
        todayTextColor: '#724EFA',
        dayTextColor: '#2d4150',
        textDisabledColor: '#d9e1e8',
        dotColor: '#00adf5',
        selectedDotColor: '#ffffff',
        arrowColor: '#724EFA',
        disabledArrowColor: '#d9e1e8',
        monthTextColor: 'black',
        indicatorColor: 'blue',
        textDayFontFamily: ButtonFont,
        textMonthFontFamily: ButtonFont,
        textDayHeaderFontFamily: ButtonFont,
        textDayFontWeight: '300',
        textMonthFontWeight: 'bold',
        textDayHeaderFontWeight: 'bold',
        textDayFontSize: 16,
        textMonthFontSize: 16,
        textDayHeaderFontSize: 14,
      }}
      style={styles.calmar}
      onDayPress={day => {
        console.log(day);
        getSelectedDayEvents(day.dateString);
        console.log('selected day', day.dateString);
        fetchdate(day.dateString);
      }}
      markedDates={date}
    />
  );
};

const styles = StyleSheet.create({
  calmar: {
    marginTop: 15,
  },
});

export default CalendarManagement;
