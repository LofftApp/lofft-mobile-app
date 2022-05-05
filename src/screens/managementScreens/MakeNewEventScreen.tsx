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
import DateTimeInputField from '../../components/forms/DateTimeInputField';

// Helpers
import {
  dateFormatter,
  timeFormatter,
} from '../../components/helperFunctions/dateFormatter';

// Styles
import {CoreStyleSheet} from '../../StyleSheets/CoreDesignStyleSheet';
import {fontStyles} from '../../StyleSheets/FontStyleSheet';
import color from '../../assets/defaultColorPallet.json';

// Firestore

const MakeNewEventScreen = ({navigation, route}) => {
  const defDate = new Date(route.params.selectedDate);
  const [eventName, setEventName] = useState('');
  const [location, setLocation] = useState('');
  const [informFlatmates, setinformFlatmates] = useState(false);
  const [description, setdescription] = useState('');

  const [date, setDate] = useState(defDate);
  const [fromTime, setFromTime] = useState(defDate);
  const [untilTime, setUntilTime] = useState(defDate);

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

      <View style={styles.formContainer}>
        <View style={styles.formFields}>
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
          <DateTimeInputField
            inputHeader="Date"
            value={date}
            onConfirm={date => {
              setDate(date);
            }}
          />
          <View style={styles.timeContainer}>
            <DateTimeInputField
              inputHeader="Starts"
              value={fromTime}
              time
              onConfirm={time => {
                setFromTime(time);
              }}
              position="left"
            />
            <DateTimeInputField
              inputHeader="Ends"
              value={untilTime}
              time
              onConfirm={time => {
                setUntilTime(time);
              }}
              position="right"
            />
          </View>

          <TextInputField
            value={description}
            onChageText={e => setdescription(e)}
            inputHeader="Description"
            placeholder="Hey what's happening..."
            multiline
          />

          {/* <View style={styles.inputToggleContainer}>
          <Text style={[fontStyles.buttonTextMedium, {flex: 1}]}>
            Let your flatmates know?
          </Text>
          <Switch
            color="#724EFA"
            value={informFlatmates}
            onValueChange={onToggleSwitch}
          />
        </View> */}
        </View>
        <CoreButton
          value="Next"
          style={styles.button}
          onPress={() =>
            navigation.navigate('AddFriendsToEvent', {
              title: eventName,
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
  formContainer: {
    flex: 1,
    marginVertical: 15,
    paddingVertical: 15,
  },
  formFields: {
    flex: 1,
  },

  timeContainer: {
    flexDirection: 'row',
  },
});

export default MakeNewEventScreen;
