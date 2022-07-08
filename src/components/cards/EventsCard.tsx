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
import {CoreButton} from '../Buttons/CoreButton';
import HalfBackgroundImage from './../../assets/banner-background-half.png';
import TagIcon from '../Icons/TagIcon';

// Styles
import {fontStyles} from '../../StyleSheets/FontStyleSheet';
import color from '../../assets/defaultColorPallet.json';

const EventsCard = ({event}) => {
  // Hooks
  // const [tags, setUserTags] = useState({text: 'invited', color: 'Lavendar'});
  const [tags, setTags] = useState({text: 'invited', color: 'Lavendar'});
  const [cancelled, setCancelled] = useState(false);
  const [attending, setAttending] = useState(false);
  const [notAttending, setNotAttending] = useState(false);
  const [creator, setCreator] = useState(false);

  useEffect(() => {
    if (event.createdBy === auth().currentUser.uid) {
      setTags({text: 'Creator', color: 'Blue'});
      setCreator(true);
    }

    if (event.attending.includes(auth().currentUser.uid)) {
      setTags({text: 'Attending', color: 'Mint'});
      setAttending(true);
    }

    if (event.notAttending.includes(auth().currentUser.uid)) {
      setTags({text: 'Not Attending', color: 'Tomato'});
      setAttending(true);
    }

    if (!event.active) {
      setTags({text: 'Cancelled', color: 'Black'});
      setCancelled(true);
    }
  }, []);

  const triggerCancelled = () => {
    setTags({text: 'Cancelled', color: 'Black'});
    setCancelled(true);
  };

  const triggerAttending = () => {
    setTags({text: 'Attending', color: 'Mint'});
    setAttending(true);
  };

  const triggerReject = () => {
    setTags({text: 'Not Attending', color: 'Tomato'});
    setNotAttending(true);
  };

  return (
    <View style={styles.card}>
      <ImageBackground source={HalfBackgroundImage} style={styles.eventCard}>
        <View style={styles.contentContainer}>
          <View style={styles.headerBar}>
            <Text style={[fontStyles.buttonTextMedium, styles.title]}>
              {event.title}
            </Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 5,
  },
  title: {
    flex: 1,
  },
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
