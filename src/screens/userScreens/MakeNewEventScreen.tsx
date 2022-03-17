import React, {useState} from 'react';
import {Text, View, StyleSheet, ImageBackground, TextInput} from 'react-native';

// Components
import HeaderBar from '../../components/bannersAndBars/HeaderBar';
import AddButtonPoll from '../../components/buttons/AddButtonPoll';
import CustomBackButton from '../../components/buttons/CustomBackButton';
import {CoreButton} from '../../components/buttons/CoreButton';

// Styles
import {CoreStyleSheet} from '../../StyleSheets/CoreDesignStyleSheet';
import {fontStyles} from '../../StyleSheets/FontStyleSheet';
import color from './../../assets/defaultColorPallet.json';
import HalfBackgroundImage from './../../assets/banner-background-half.png';

const MakeNewEventScreen = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [fromdate, setfromDate] = useState('');
  const [untildate, setuntilDate] = useState('');
  const [informFlatmates, setinformFlatmates] = useState('');
  const [description, setdescription] = useState('');

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
            <TextInput
              style={[styles.inputStyle, fontStyles.bodyMedium]}
              placeholder="(dd/mm/yyyy)"
              autoCapitalize="none"
              value={date}
              onChangeText={text => setDate(text)}
            />
          </View>

          <View style={styles.timeContainer}>
            <Text style={[fontStyles.buttonTextMedium, {flex: 1}]}>Time</Text>

            <View style={[styles.inputTimeContainer, {marginLeft: 12}]}>
              <View style={styles.timeinputContainer}>
                <Text style={fontStyles.buttonTextSmall}>From:</Text>
                <TextInput
                  style={[styles.timeInputForm, fontStyles.bodyMedium]}
                  placeholder=""
                  autoCapitalize="none"
                  value={fromdate}
                  onChangeText={text => setfromDate(text)}
                />
              </View>
              <View style={styles.timeBreaker} />
              <View style={styles.timeinputContainer}>
                <Text style={fontStyles.buttonTextSmall}>Until:</Text>
              <TextInput
                style={[styles.timeInputForm, fontStyles.bodyMedium]}
                placeholder=""
                autoCapitalize="none"
                value={untildate}
                onChangeText={text => setuntilDate(text)}
              />
              </View>
            </View>
          </View>
        </ImageBackground>
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
    marginTop: 10,
    marginHorizontal: 14,
  },

  inputStyle: {
    backgroundColor: color.White[100],
    flex: 2,
    padding: 10,
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
    padding: 10,
  },

  timeBreaker: {
    flex: 0.2,
  },
});

export default MakeNewEventScreen;
