import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {List} from 'react-native-paper';

// Components
import HeaderBar from '../../components/bannersAndBars/HeaderBar';
import ToggleBar from './../../components/bannersAndBars/ToggleBar';
import PollCard from '../../components/cards/PollCard';
import NewPollContainer from '../../components/iconsAndContainers/NewPollContainer';

// StyleSheets
import {CoreStyleSheet} from '../../StyleSheets/CoreDesignStyleSheet';
import {fontStyles} from '../../StyleSheets/FontStyleSheet';
import CalendarManagement from '../../components/calendar/CalendarManagement';
import {CoreButton} from '../../components/buttons/CoreButton';

const ManagementScreen = ({navigation, route}: any) => {
  // User Hooks
  const [image, setImage]: any = useState('');
  // Hooks
  const [pollsactivated, setPollsactivated] = useState(true);
  const [expanded, setExpanded] = useState(true);
  const [date, setdate] = useState("")



  const buttonToggle = useCallback(toggled => {
    setPollsactivated(toggled);
  }, []);

  const handlePress = () => setExpanded(!expanded);

  const fetchdate = (dateInput) => {
    setdate(dateInput);
  }

console.log(`Date is being fetched and assigned into setdate state: ${date}`)

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
              <NewPollContainer
                buttonValue="Create New Poll"
                buttonAction={() => navigation.navigate('MakeNewPoll')}
              />

              <List.Section>
                <List.Accordion
                  title={
                    <Text style={fontStyles.buttonTextLarge}>Active Polls</Text>
                  }
                  style={styles.accordionContainer}
                  expanded={expanded}
                  onPress={handlePress}>
                  {/* !!! ATTENTION POLLCARDS ARE HARD CODED THIS WHERE DB ITTERATION WILL TAKE PLACE !!! */}
                  <PollCard
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
                  />
                </List.Accordion>
              </List.Section>

              <List.Section>
                <List.Accordion
                  title={
                    <Text style={fontStyles.buttonTextLarge}>Past Polls</Text>
                  }
                  style={styles.accordionContainer}>
                  {/* !!! ATTENTION POLLCARDS ARE HARD CODED THIS WHERE DB ITTERATION WILL TAKE PLACE !!! */}
                  <PollCard
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
                  />
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
                  onPress={() => navigation.navigate('')}
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
  accordionContainer: {
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'flex-start',
  },
  buttonContainer: {
    marginVertical: 170,
  },
  button: {
    marginVertical: 5,
  },
});

export default ManagementScreen;
