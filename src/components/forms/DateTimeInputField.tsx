import React, {useState} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';

// Components
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import {dateFormatter, timeFormatter} from '../helperFunctions/dateFormatter';

// Styles
import {fontStyles} from '../../StyleSheets/FontStyleSheet';
import color from '../../assets/defaultColorPallet.json';

const DateTimeInputField = ({
  value,
  inputHeader,
  onConfirm = null,
  time = false,
}) => {
  // Hooks
  const [dateOpen, setDateOpen] = useState(false);

  return (
    <View style={[styles.inputContainer, time ? styles.timeInput : null]}>
      <Text style={[fontStyles.buttonTextSmall]}>{inputHeader}</Text>
      <TouchableOpacity
        style={[styles.inputStyle]}
        onPress={() => setDateOpen(true)}>
        <Text style={[fontStyles.bodyMedium]}>
          {time ? timeFormatter(value) : dateFormatter(value)}
        </Text>
        <Icon
          name={time ? 'time-outline' : 'calendar-outline'}
          size={25}
          color={color.Black[30]}
        />
      </TouchableOpacity>
      <DatePicker
        modal
        minimumDate={new Date()}
        minuteInterval={5}
        mode={time ? 'time' : 'date'}
        open={dateOpen}
        date={value}
        onConfirm={date => {
          setDateOpen(false);
          onConfirm(date);
        }}
        onCancel={() => setDateOpen(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    padding: 0,
  },
  inputStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: color.Lavendar[10],
    paddingVertical: 13,
    paddingHorizontal: 10,
    marginTop: 5,
    borderRadius: 4,
  },
  timeInput: {
    flex: 1,
    paddingHorizontal: 4,
  },
  textNoValue: {
    color: color.Black[25],
  },
});

export default DateTimeInputField;
