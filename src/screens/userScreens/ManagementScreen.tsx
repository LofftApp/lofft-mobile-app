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
import NewPollContainer from '../../components/iconsAndContainers/NewPollContainer';
import CalendarManagement from '../../components/calendar/CalendarManagement';
import {CoreButton} from '../../components/buttons/CoreButton';

// StyleSheets 🌈
import {CoreStyleSheet} from '../../StyleSheets/CoreDesignStyleSheet';
import {fontStyles} from '../../StyleSheets/FontStyleSheet';

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
      setPolls(await getLofftPolls());
      // if (result) {
      //   result.forEach(poll => {
      //     setPolls(polls => [...polls, poll.data()]);
      //   });
      // }
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
                  buttonAction={() => navigation.navigate('MakeNewPoll')}
                  style={styles.newPollButton}
                />
              </View>

              <List.Section>
                <List.Accordion
                  title={
                    <Text style={fontStyles.buttonTextLarge}>Active Polls</Text>
                  }
                  style={styles.accordionContainer}
                  expanded={expanded}
                  onPress={handlePress}>
                  {/* !!! ATTENTION POLLCARDS ARE HARD CODED THIS WHERE DB ITTERATION WILL TAKE PLACE !!! */}

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
                    <Text style={fontStyles.buttonTextLarge}>Past Polls</Text>
                  }
                  style={styles.accordionContainer}>
                  {/* !!! ATTENTION POLLCARDS ARE HARD CODED THIS WHERE DB ITTERATION WILL TAKE PLACE !!! */}
                  {/* <PollCard
                    value="Example"
                    buttonAction={() => navigation.navigate('')}
                  />
                  <PollCard
                    value="Example"
                    buttonAction={() => navigation.navigate('')}
                  />
                  <PollCard
                    value="Example"
                    buttonAction={() => navigation.navigate('')}
                  /> */}
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
    height: 80,
    marginVertical: 16,
    paddingVertical: 16,
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
  buttonContainer: {
    marginVertical: 120,
  },
  button: {
    marginVertical: 5,
  },
});

export default ManagementScreen;
