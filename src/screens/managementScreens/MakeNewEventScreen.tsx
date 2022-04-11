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

const MakeNewEventScreen = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [fromdate, setfromDate] = useState('');
  const [untildate, setuntilDate] = useState('');
  const [informFlatmates, setinformFlatmates] = useState(false);
  const [description, setdescription] = useState('');

  const [date, setDate] = useState(new Date());
  const [fromTime, setFromTime] = useState(new Date());
  const [untilTime, setUntilTime] = useState(new Date());
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
        <ImageBackground
          source={HalfBackgroundImage}
          style={styles.eventContainer}
          resizeMode="cover">
          <View style={styles.InputContainer}>
            <Text style={[fontStyles.buttonTextMedium, {flex: 1}]}>Title</Text>
            <TextInput
              style={[styles.inputStyle, fontStyles.bodyMedium]}
              placeholder="Name of Event"
              autoCapitalize="none"
              value={title}
              onChangeText={text => setTitle(text)}
            />
          </View>

          <View style={styles.InputContainer}>
            <Text style={[fontStyles.buttonTextMedium, {flex: 1}]}>
              Location
            </Text>
            <TextInput
              style={[styles.inputStyle, fontStyles.bodyMedium]}
              placeholder="e.g the kitchen"
              autoCapitalize="none"
              value={location}
              onChangeText={text => setLocation(text)}
            />
          </View>

          <View style={styles.InputContainer}>
            <Text style={[fontStyles.buttonTextMedium, {flex: 1}]}>Date</Text>
            <TouchableOpacity
              style={styles.inputStyle}
              onPress={() => setDateOpen(true)}>
              <Text style={fontStyles.bodyMedium}>{dateFormatter(date)}</Text>
            </TouchableOpacity>
            <DatePicker
              modal
              minimumDate={new Date()}
              mode="date"
              open={dateOpen}
              date={date}
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
                  onPress={() => setFromTimeOpen(true)}>
                  <Text style={[fontStyles.bodyMedium]}>
                    {timeFormatter(fromTime)}
                  </Text>
                </TouchableOpacity>
                <DatePicker
                  modal
                  mode="time"
                  minuteInterval={5}
                  open={fromTimeOpen}
                  date={fromTime}
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
                  onPress={() => setUntilTimeOpen(true)}>
                  <Text style={[fontStyles.bodyMedium]}>
                    {timeFormatter(untilTime)}
                  </Text>
                </TouchableOpacity>
                <DatePicker
                  modal
                  minuteInterval={5}
                  mode="time"
                  open={untilTimeOpen}
                  date={untilTime}
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
        </ImageBackground>
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
              fromdate,
              untildate,
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
    display: 'flex',
    alignItems: 'center',
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
});

export default MakeNewEventScreen;
