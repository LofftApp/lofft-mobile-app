import React, {useState} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/Ionicons';

// Helpers 🤷
import {dateFormatter, timeFormatter} from '@Helpers/dateFormatter';

// Styles 🖌
import {fontStyles} from '@StyleSheets/FontStyleSheet';
// Assets 🖼
import color from '@Assets/lofftColorPallet.json';

const DateTimeInputField = ({
  value,
  inputHeader,
  onConfirm = null,
  time = false,
  position = null,
}) => {
  // Hooks
  const [dateOpen, setDateOpen] = useState(false);

  return (
    <View
      style={[
        styles.inputContainer,
        time ? styles.timeInput : null,
        position === 'left'
          ? {marginRight: 5}
          : position === 'right'
          ? {marginLeft: 5}
          : null,
      ]}>
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
    marginVertical: 5,
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
  },
  textNoValue: {
    color: color.Black[25],
  },
});

export default DateTimeInputField;
