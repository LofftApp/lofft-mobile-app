// React ⚛
import React, {useState, useEffect, useCallback} from 'react';

// React Native 📱
import {
  View,
  Text,
  StyleSheet,
  Platform,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {List} from 'react-native-paper';

// Components 🪢
import HeaderBar from '../../components/bannersAndBars/HeaderBar';
import ToggleBar from './../../components/bannersAndBars/ToggleBar';
import PollCard from '../../components/cards/PollCard';
import CalendarManagement from '../../components/calendar/CalendarManagement';
import {CoreButton} from '../../components/buttons/CoreButton';

// StyleSheets 🌈
import {CoreStyleSheet} from '../../StyleSheets/CoreDesignStyleSheet';
import {fontStyles} from '../../StyleSheets/FontStyleSheet';
import color from '../../assets/defaultColorPallet.json';

// FireStore 🔥
import {getLofftPolls} from '../../api/firebase/fireStoreActions';

// Helper Functions
import dateCal from '../../components/helperFunctions/dateCal';

const ManagementScreen = ({navigation, route}: any) => {
  // User Hooks
  const [image, setImage]: any = useState('');
  // Hooks
  const [pollsactivated, setPollsactivated] = useState(true);
  const [expanded, setExpanded] = useState(true);
  const [date, setdate] = useState('');
  const [polls, setPolls] = useState([]);
  const [pastPolls, setPastPolls] = useState([]);
  const [todayDate] = useState(new Date());

  const buttonToggle = useCallback(toggled => {
    setPollsactivated(toggled);
  }, []);

  const handlePress = () => setExpanded(!expanded);

  const fetchdate = dateInput => {
    setdate(dateInput);
  };

  useEffect(() => {
    const pollsData = async () => {
      setPolls([]);
      const allPolls = await getLofftPolls();
      const currentPolls = allPolls.filter(
        poll =>
          (poll.data().deadline &&
            new Date(poll.data().deadline.seconds * 1000) > todayDate) ||
          !poll.data().deadline,
      );
      const oldPolls = allPolls.filter(
        poll =>
          poll.data().deadline &&
          new Date(poll.data().deadline.seconds * 1000) < todayDate,
      );
      setPolls(currentPolls);
      setPastPolls(oldPolls);
    };
    pollsData();
  }, []);
  return (
    <View
      style={[
        CoreStyleSheet.viewContainerStyle,
        Platform.OS === 'ios' ? CoreStyleSheet.viewContainerIOSStyle : null,
      ]}>
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}>
          <HeaderBar title="Management" image={image} />

          <ToggleBar
            optionA="Polls"
            optionB="Flat's calendar"
            dashboard={buttonToggle}
          />

          {pollsactivated ? (
            <>
              <View style={styles.newPollContainer}>
                <CoreButton
                  value="Create New Poll"
                  onPress={() => navigation.navigate('MakeNewPoll')}
                  style={styles.newPollButton}
                />
              </View>

              <List.Section>
                <List.Accordion
                  title={
                    <View style={styles.accordionHeader}>
                      <View style={styles.numberIcon}>
                        <Text
                          style={[
                            fontStyles.bodySmall,
                            {color: color.White[100]},
                          ]}>
                          {polls.length}
                        </Text>
                      </View>
                      <Text style={fontStyles.buttonTextLarge}>
                        Active Polls
                      </Text>
                    </View>
                  }
                  style={styles.accordionContainer}
                  expanded={expanded}
                  onPress={handlePress}>
                  {polls.length > 0 ? (
                    polls.map((el, index) => (
                      <PollCard value={el} key={index} />
                    ))
                  ) : (
                    <Text style={[fontStyles.bodyMedium, {marginLeft: 15}]}>
                      Awkward, nothing here yet.... Create your first poll 🫀
                    </Text>
                  )}
                </List.Accordion>
              </List.Section>

              <List.Section>
                <List.Accordion
                  title={
                    <View style={styles.accordionHeader}>
                      <View style={[styles.numberIcon, styles.pastPolls]}>
                        <Text
                          style={[
                            fontStyles.bodySmall,
                            {color: color.White[100]},
                          ]}>
                          {pastPolls.length}
                        </Text>
                      </View>
                      <Text style={fontStyles.buttonTextLarge}>Past Polls</Text>
                    </View>
                  }
                  style={styles.accordionContainer}>
                  {pastPolls.length > 0 ? (
                    pastPolls.map((el, index) => (
                      <PollCard value={el} key={index} inactive />
                    ))
                  ) : (
                    <Text style={[fontStyles.bodyMedium, {marginLeft: 15}]}>
                      No Passt Polls yet
                    </Text>
                  )}
                </List.Accordion>
              </List.Section>
            </>
          ) : (
            <>
              <CalendarManagement fetchdate={fetchdate} />
              <View style={styles.buttonContainer}>
                <CoreButton
                  value="Add new event"
                  style={styles.button}
                  invert
                  onPress={() => navigation.navigate('MakeNewEvent', {date})}
                />
              </View>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  newPollContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    marginTop: 16,
    paddingVertical: 8,
  },
  newPollButton: {
    width: '60%',
    flex: 1,
  },
  accordionContainer: {
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'flex-start',
  },
  accordionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  numberIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.Mint[100],
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 5,
  },
  pastPolls: {
    backgroundColor: color.Black[50],
  },
  buttonContainer: {
    marginVertical: 120,
  },
  button: {
    marginVertical: 5,
  },
});

export default ManagementScreen;
