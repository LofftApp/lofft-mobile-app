import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

const ButtonFont = 'Roboto-Bold';

const CalendarManagement = ({fetchdate, events}) => {
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
        fetchdate(day.dateString);
      }}
      markedDates={events}
    />
  );
};

const styles = StyleSheet.create({
  calmar: {
    marginTop: 15,
  },
});

export default CalendarManagement;
