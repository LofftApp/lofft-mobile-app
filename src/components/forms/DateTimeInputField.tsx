import React, {useState} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';

// Components
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import {dateFormatter} from '../helperFunctions/dateFormatter';

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
  const [date, setDate] = useState(new Date(value));

  return (
    <View style={styles.inputContainer}>
      <Text style={[fontStyles.buttonTextSmall]}>{inputHeader}</Text>
      <TouchableOpacity
        style={styles.inputStyle}
        onPress={() => setDateOpen(true)}>
        <Text style={[fontStyles.bodyMedium]}>{dateFormatter(date)}</Text>
        <Icon
          name={time ? 'time-outline' : 'calendar-outline'}
          size={25}
          color={color.Black[30]}
        />
      </TouchableOpacity>
      <DatePicker
        modal
        minimumDate={new Date()}
        mode="date"
        open={dateOpen}
        date={date}
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
    width: '100%',
    backgroundColor: color.Lavendar[10],
    paddingVertical: 13,
    paddingHorizontal: 10,
    marginTop: 5,
    borderRadius: 4,
  },
  textNoValue: {
    color: color.Black[25],
  },
});

export default DateTimeInputField;
