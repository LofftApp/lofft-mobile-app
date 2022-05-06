import React, {useState} from 'react';
import {Text, View, StyleSheet, Platform, ScrollView} from 'react-native';

// Components
import CustomBackButton from '../../components/buttons/CustomBackButton';
import {CoreButton} from '../../components/buttons/CoreButton';
import TextInputField from '../../components/forms/TextInputField';
import DateTimeInputField from '../../components/forms/DateTimeInputField';
import UserIcon from '../../components/iconsAndContainers/UserIcon';

// Styles
import {CoreStyleSheet} from '../../StyleSheets/CoreDesignStyleSheet';
import {fontStyles} from '../../StyleSheets/FontStyleSheet';

// Firestore
import {addEvent} from '../../api/firebase/fireStoreActions';

const MakeNewEventScreen = ({navigation, route}) => {
  const defDate = new Date(route.params.selectedDate);
  const [eventName, setEventName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setdescription] = useState('');

  const [date, setDate] = useState(defDate);
  const [fromTime, setFromTime] = useState(defDate);
  const [untilTime, setUntilTime] = useState(defDate);

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
        <ScrollView style={styles.formFields}>
          <View style={styles.detailsBox}>
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
          </View>
          <View style={styles.detailsBox}>
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
          </View>
          <View style={styles.detailsBox}>
            <TextInputField
              value={description}
              onChageText={e => setdescription(e)}
              inputHeader="Description"
              placeholder="Hey what's happening..."
              multiline
            />
          </View>
          {/* Flat Mates and Lofft space */}
          <View>
            <Text style={[fontStyles.buttonTextSmall]}>Invite</Text>
            <View style={styles.inviteUsersBar}>
              <View style={styles.lofftSpaceButton}>
                <UserIcon lofftSpace onPress={() => {}} />
              </View>
              <View style={styles.userIconButton}>
                <UserIcon onPress={() => {}} />
                <UserIcon onPress={() => {}} />
                <UserIcon onPress={() => {}} />
              </View>
            </View>
          </View>
        </ScrollView>
        <CoreButton
          value="Confirm"
          onPress={() => {
            navigation.navigate('Managment');
            addEvent(
              eventName,
              location,
              date,
              fromTime,
              untilTime,
              description,
            );
          }}
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
  detailsBox: {
    marginVertical: 5,
  },
  timeContainer: {
    flexDirection: 'row',
  },
  inviteUsersBar: {
    marginVertical: 15,
    flexDirection: 'row',
  },
  lofftSpaceButton: {
    paddingHorizontal: 10,
    marginRight: 10,
  },
  userIconButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default MakeNewEventScreen;
