import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {List} from 'react-native-paper';

// Stylesheets 🌈
import {fontStyles} from '../../StyleSheets/FontStyleSheet';
import color from '../../assets/defaultColorPallet.json';

// Components 🪢
import {CoreButton} from '../buttons/CoreButton';
import PollCard from '../../components/cards/PollCard';

const PollsManagement = ({navigation, pastPolls, polls}) => {
  // Hooks
  const [expanded, setExpanded] = useState(true);
  const handlePress = () => setExpanded(!expanded);

  return (
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
                <Text style={[fontStyles.bodySmall, {color: color.White[100]}]}>
                  {polls.length}
                </Text>
              </View>
              <Text style={fontStyles.buttonTextLarge}>Active Polls</Text>
            </View>
          }
          style={styles.accordionContainer}
          expanded={expanded}
          onPress={handlePress}>
          {polls.length > 0 ? (
            polls.map((el, index) => <PollCard value={el} key={index} />)
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
                <Text style={[fontStyles.bodySmall, {color: color.White[100]}]}>
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

export default PollsManagement;
