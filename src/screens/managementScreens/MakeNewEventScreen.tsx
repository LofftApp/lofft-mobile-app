import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TextInput,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {Switch} from 'react-native-paper';

// Components
import CustomBackButton from '../../components/buttons/CustomBackButton';
import {CoreButton} from '../../components/buttons/CoreButton';
import DatePicker from 'react-native-date-picker';
import TextInputField from '../../components/forms/TextInputField';

// Helpers
import {
  dateFormatter,
  timeFormatter,
} from '../../components/helperFunctions/dateFormatter';

// Styles
import {CoreStyleSheet} from '../../StyleSheets/CoreDesignStyleSheet';
import {fontStyles} from '../../StyleSheets/FontStyleSheet';
import color from '../../assets/defaultColorPallet.json';
import HalfBackgroundImage from './../../assets/banner-background-half.png';

// Firestore

const MakeNewEventScreen = ({navigation, route}) => {
  console.log(route.params.selectedDate);
  const [eventName, setEventName] = useState('');
  const [location, setLocation] = useState('');
  const [fromdate, setfromDate] = useState('');
  const [untildate, setuntilDate] = useState('');
  const [informFlatmates, setinformFlatmates] = useState(false);
  const [description, setdescription] = useState('');

  const [date, setDate] = useState(new Date(route.params.selectedDate));
  const [fromTime, setFromTime] = useState(null);
  const [untilTime, setUntilTime] = useState(null);
  const [dateOpen, setDateOpen] = useState(false);
  const [fromTimeOpen, setFromTimeOpen] = useState(false);
  const [untilTimeOpen, setUntilTimeOpen] = useState(false);

  const onToggleSwitch = () => setinformFlatmates(!informFlatmates);

  return (
    <View
      style={[
        CoreStyleSheet.viewContainerStyle,
        Platform.OS === 'ios' ? CoreStyleSheet.viewContainerIOSStyle : null,
      ]}>
      <CustomBackButton
        onPress={() => navigation.goBack()}
        title="Add new event"
      />

      <View style={styles.centerContainer}>
        <TextInputField
          value={eventName}
          onChageText={e => setEventName(e)}
          inputHeader="Event Name"
          placeholder="event name..."
        />
        <TextInputField
          value={location}
          onChageText={e => setLocation(e)}
          inputHeader="Location"
          placeholder="Wilsnackerstr..."
        />

        <View style={styles.InputContainer}>
          <Text style={[fontStyles.buttonTextMedium, {flex: 1}]}>Date</Text>
          <TouchableOpacity
            style={styles.inputStyle}
            onPress={() => setDateOpen(true)}>
            <Text
              style={[fontStyles.bodyMedium, date ? null : styles.textNoValue]}>
              {date ? dateFormatter(date) : 'Choose date'}
            </Text>
          </TouchableOpacity>
          <DatePicker
            modal
            minimumDate={new Date()}
            mode="date"
            open={dateOpen}
            date={date ? date : new Date()}
            onConfirm={date => {
              setDateOpen(false);
              setDate(date);
            }}
            onCancel={() => setDateOpen(false)}
          />
        </View>

        <View style={styles.timeContainer}>
          <Text style={[fontStyles.buttonTextMedium, {flex: 1}]}>Time</Text>

          <View style={[styles.inputTimeContainer, {marginLeft: 12}]}>
            <View style={styles.timeinputContainer}>
              <Text style={fontStyles.buttonTextSmall}>From:</Text>
              <TouchableOpacity
                style={styles.timeInputForm}
                onPress={() => {
                  date ? setFromTime(date) : null;
                  setFromTimeOpen(true);
                }}>
                <Text
                  style={[
                    fontStyles.bodyMedium,
                    fromTime ? null : styles.textNoValue,
                  ]}>
                  {fromTime ? timeFormatter(fromTime) : '##:##'}
                </Text>
              </TouchableOpacity>
              <DatePicker
                modal
                mode="time"
                minuteInterval={5}
                open={fromTimeOpen}
                date={fromTime ? fromTime : new Date()}
                onConfirm={time => {
                  setFromTimeOpen(false);
                  setFromTime(time);
                }}
                onCancel={() => setFromTimeOpen(false)}
              />
            </View>
            <View style={styles.timeBreaker} />
            <View style={styles.timeinputContainer}>
              <Text style={fontStyles.buttonTextSmall}>Until:</Text>
              <TouchableOpacity
                style={styles.timeInputForm}
                onPress={() => {
                  date ? setUntilTime(date) : null;
                  setUntilTimeOpen(true);
                }}>
                <Text
                  style={[
                    fontStyles.bodyMedium,
                    untilTime ? null : styles.textNoValue,
                  ]}>
                  {untilTime ? timeFormatter(untilTime) : '##:##'}
                </Text>
              </TouchableOpacity>
              <DatePicker
                modal
                minuteInterval={5}
                mode="time"
                open={untilTimeOpen}
                date={untilTime ? untilTime : new Date()}
                onConfirm={time => {
                  setUntilTimeOpen(false);
                  setUntilTime(time);
                }}
                onCancel={() => setUntilTimeOpen(false)}
              />
            </View>
          </View>
        </View>

        <View style={styles.inputToggleContainer}>
          <Text style={[fontStyles.buttonTextMedium, {flex: 1}]}>
            Let your flatmates know?
          </Text>
          <Switch
            color="#724EFA"
            value={informFlatmates}
            onValueChange={onToggleSwitch}
          />
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={[fontStyles.buttonTextMedium, {flex: 0.2}]}>
            Description
          </Text>
          <TextInput
            style={[styles.descriptionInputForm, fontStyles.bodyMedium]}
            placeholder=""
            autoCapitalize="none"
            value={description}
            onChangeText={text => setdescription(text)}
            multiline={true}
          />
        </View>
      </View>

      <View style={styles.actionButtonContainer}>
        <CoreButton
          value="Next"
          style={styles.button}
          onPress={() =>
            navigation.navigate('AddFriendsToEvent', {
              title,
              location,
              date,
              fromTime,
              untilTime,
              informFlatmates,
              description,
            })
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    // display: 'flex',
    // alignItems: 'center',
  },

  eventContainer: {
    height: 579,
    width: 344,
    marginTop: 20,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: 'transparent',
    overflow: 'hidden',
  },

  InputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 19,
    marginHorizontal: 14,
  },

  inputStyle: {
    backgroundColor: color.White[100],
    flex: 2,
    padding: 12,
    marginLeft: 21,
    borderRadius: 8,
  },

  timeContainer: {
    marginTop: 14,
    marginHorizontal: 14,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  inputTimeContainer: {
    flex: 2,
    flexDirection: 'row',
  },

  timeinputContainer: {
    flex: 0.9,
    // First timeinput has InlineStyling!
  },

  timeInputForm: {
    marginTop: 5,
    backgroundColor: color.White[100],
    borderRadius: 8,
    padding: 12,
  },

  timeBreaker: {
    flex: 0.2,
  },
  inputToggleContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 26,
    marginHorizontal: 14,
    alignItems: 'center',
  },

  descriptionContainer: {
    flex: 1,
    marginHorizontal: 14,
    marginTop: 20,
  },

  descriptionInputForm: {
    backgroundColor: color.White[100],
    flex: 0.7,
    borderRadius: 8,
    padding: 10,
  },
  actionButtonContainer: {
    marginTop: 20,
  },
  button: {
    marginVertical: 5,
  },
  textNoValue: {
    color: color.Black[25],
  },
});

export default MakeNewEventScreen;
