import React from 'react';
import moment from 'moment';
import {View, StyleSheet} from 'react-native';
import {Calendar} from 'react-native-calendars';

const ButtonFont = 'Roboto-Bold';
const _format = 'YYYY-MM-DD';
const _today = moment().format(_format);
const _maxDate = moment().add(15, 'days').format(_format);

class CalendarManagement extends React.Component {
  initialState = {
    [_today]: {selected: true},
  };

  constructor(props) {
    super(props);
    props.events.forEach(e => {
      console.log(e);
      if (e === _today) {
        this.initialState[e].marked = true;
      } else {
        this.initialState[e] = {marked: true};
      }
    });
    this.state = {
      _selectedDates: this.initialState,
    };
  }
  onDaySelect = day => {
    const _selectedDay = moment(day.dateString).format(_format);

    let selected = true;
    let selectedDates = {};
    if (this.state._selectedDates[_selectedDay]) {
      selected = !this.state._selectedDates[_selectedDay].selected;
      selectedDates = this.state._selectedDates[_selectedDay];
    }
    selectedDates = {...selectedDates, ...{selected}};
    const updateSelectedDates = {
      ...this.state._selectedDates,
      ...{[_selectedDay]: selectedDates},
    };

    this.setState({_selectedDates: updateSelectedDates});
  };

  render() {
    return (
      <View>
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
          minDate={_today}
          maxDate={_maxDate}
          style={styles.calmar}
          onDayPress={this.onDaySelect}
          markedDates={this.state._selectedDates}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  calmar: {
    marginTop: 15,
  },
});

export default CalendarManagement;
