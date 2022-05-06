import React, {useState, useEffect} from 'react';
import {View, Text, ImageBackground, StyleSheet} from 'react-native';

// Firebase
import auth from '@react-native-firebase/auth';
import {
  attendLofftEvent,
  cancelLofftEvent,
  rejectLofftEvent,
} from '../../api/firebase/fireStoreActions';

// Components 🪢
import {CoreButton} from '../../components/buttons/CoreButton';
import HalfBackgroundImage from './../../assets/banner-background-half.png';
import TagIcon from '../iconsAndContainers/TagIcon';

// Styles
import {fontStyles} from '../../StyleSheets/FontStyleSheet';
import color from '../../assets/defaultColorPallet.json';

const EventsCard = ({event}) => {
  // Hooks
  let tags = {text: 'invited', color: 'Lavendar'};
  let cancelled = false;
  let attending = false;
  let notAttending = false;
  let creator = false;

  if (event.createdBy === auth().currentUser.uid) {
    tags = {text: 'Creator', color: 'Blue'};
    creator = true;
  }

  if (event.attending.includes(auth().currentUser.uid)) {
    tags = {text: 'Attending', color: 'Mint'};
    attending = true;
  }

  if (event.notAttending.includes(auth().currentUser.uid)) {
    tags = {text: 'Not Attending', color: 'Tomato'};
    notAttending = true;
  }

  if (!event.active) {
    tags = {text: 'Cancelled', color: 'Black'};
    cancelled = true;
  }

  const triggerCancelled = () => {
    console.log('Cancelled triggered');
    tags = {text: 'Cancelled', color: 'Black'};
    cancelled = true;
  };

  const triggerAttending = () => {
    tags = {text: 'Attending', color: 'Mint'};
    attending = true;
  };

  const triggerReject = () => {
    tags = {text: 'Not Attending', color: 'Tomato'};
    notAttending = true;
  };

  return (
    <>
      <ImageBackground source={HalfBackgroundImage} style={styles.eventCard}>
        <View style={styles.contentContainer}>
          <View style={styles.headerBar}>
            <Text style={fontStyles.buttonTextMedium}>{event.title}</Text>
            <TagIcon text={tags.text} userColor={tags.color} />
          </View>
          <Text>
            {event.fromTime} - {event.toTime}
          </Text>
          <View>
            <Text>{event.description}</Text>
          </View>
          <View style={styles.buttonBar}>
            {creator ? (
              cancelled ? null : (
                <CoreButton
                  value="Cancel"
                  style={[styles.buttonStyle, styles.eventWarning]}
                  textStyle={[
                    fontStyles.buttonTextSmall,
                    styles.buttonFontStyle,
                  ]}
                  onPress={() => {
                    cancelLofftEvent(event.uid);
                    triggerCancelled();
                  }}
                />
              )
            ) : attending || notAttending ? null : (
              <>
                <CoreButton
                  value="Attend"
                  style={[styles.buttonStyle, styles.eventAttend]}
                  textStyle={[
                    fontStyles.buttonTextSmall,
                    styles.buttonFontStyle,
                  ]}
                  onPress={() => {
                    attendLofftEvent(event.uid);
                    triggerAttending();
                  }}
                />
                <CoreButton
                  value="Reject"
                  style={[styles.buttonStyle, styles.eventWarning]}
                  textStyle={[
                    fontStyles.buttonTextSmall,
                    styles.buttonFontStyle,
                  ]}
                  onPress={() => {
                    rejectLofftEvent(event.uid);
                    triggerReject();
                  }}
                />
              </>
            )}
          </View>
        </View>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: 5,
  },
  eventCard: {
    width: '100%',
    borderWidth: 1,
    borderColor: color.White[0],
    borderRadius: 8,
    overflow: 'hidden',
    minHeight: 75,
  },
  contentContainer: {
    padding: 10,
  },
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  buttonStyle: {
    width: 75,
    height: 30,
    marginHorizontal: 5,
  },
  buttonFontStyle: {
    color: color.White[100],
  },
  eventWarning: {
    backgroundColor: color.Tomato[100],
    borderColor: color.Tomato[100],
  },
  eventAttend: {
    backgroundColor: color.Mint[100],
    borderColor: color.Mint[100],
  },
});

export default EventsCard;
