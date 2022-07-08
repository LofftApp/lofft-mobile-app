import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import color from '../../assets/defaultColorPallet.json';
import {fontStyles} from '../../StyleSheets/FontStyleSheet';
import HalfBackgroundImage from './../../assets/banner-background-half.png';
import {votePoll} from '../../api/firebase/fireStoreActions';
import ResultBars from '../Bars/ResultBars';

// Firestore
import auth from '@react-native-firebase/auth';

const PollCard = ({value, inactive = false}) => {
  const [pollValue] = useState(value.data());
  const [date] = useState(
    pollValue.deadline ? pollValue.deadline.seconds * 1000 : null,
  );
  const [answers] = useState(pollValue.answers);
  const [userInputs, setUserInputs] = useState(pollValue.userInput);
  const [userAnswer, setUserAnswer] = useState(
    pollValue.userInput[auth().currentUser.uid],
  );
  const unitToTen = v => {
    return v.toString().length === 1 ? `0${v}` : v;
  };
  const convertDate = newDate => {
    const toDate = new Date(newDate);
    const day = unitToTen(toDate.getDate());
    const month = unitToTen(toDate.getMonth() + 1);
    return `${day}/${month}/${toDate.getFullYear()}`;
  };
  return (
    <ImageBackground
      source={inactive ? null : HalfBackgroundImage}
      style={[
        styles.ItemPendingPayment,
        inactive ? styles.containerBackgroundInactive : null,
      ]}>
      <View style={styles.textContainer}>
        <View>
          {date ? (
            <View
              style={[styles.deadLineStyle, inactive ? styles.inactive : null]}>
              {
                <Text
                  style={[
                    fontStyles.buttonTextSmall,
                    {color: color.White[100]},
                  ]}>
                  {convertDate(date)}
                </Text>
              }
            </View>
          ) : (
            <View style={styles.deadLineStyle}>
              <Text
                style={[fontStyles.buttonTextSmall, {color: color.White[100]}]}>
                No Deadline
              </Text>
            </View>
          )}
        </View>
        <Text style={[fontStyles.bodySmall, styles.value]}>
          {pollValue.question}
        </Text>
        <View style={styles.answerContainer}>
          {pollValue.answers.map(ans => {
            return (
              <TouchableOpacity
                disabled={inactive || ans === userAnswer}
                key={ans}
                style={[
                  styles.answer,
                  ans === userAnswer ? styles.userAnswer : null,
                  ans === userAnswer && inactive ? styles.inactive : null,
                ]}
                onPress={() => {
                  setUserAnswer(ans);
                  const updateUser = userInputs;
                  updateUser[auth().currentUser.uid] = ans;
                  setUserInputs(updateUser);
                  userInputs[auth().currentUser.uid];
                  votePoll(value.id, ans);
                }}>
                <Text style={fontStyles.buttonTextSmall}>{ans}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      {userAnswer ? (
        <View style={styles.resultContainer}>
          <Text style={[fontStyles.buttonTextSmall]}>Results</Text>
          <View>
            <ResultBars
              answers={answers}
              userAnswers={userInputs}
              inactive={inactive}
            />
          </View>
        </View>
      ) : null}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  ItemPendingPayment: {
    width: '100%',
    justifyContent: 'space-around',
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: color.White[0],
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 15,
  },
  deadLineStyle: {
    backgroundColor: color.Mint[100],
    color: color.White[100],
    borderRadius: 5,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  header: {
    marginVertical: 0,
  },
  value: {
    marginVertical: 10,
  },
  button: {
    width: 158,
    height: 53,
    marginRight: 10,
  },
  answerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
  },
  answer: {
    justifyContent: 'center',
    borderColor: color.White[80],
    borderWidth: 1,
    height: 35,
    paddingHorizontal: 15,
    backgroundColor: color.White[80],
    borderRadius: 6,
    marginBottom: 5,
  },
  userAnswer: {
    borderColor: color.Lavendar[50],
    backgroundColor: color.Lavendar[50],
  },
  inactive: {
    backgroundColor: color.Black[50],
  },
  containerBackgroundInactive: {
    backgroundColor: color.Black[10],
  },
  resultContainer: {
    padding: 10,
    marginTop: 5,
  },
  barContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  progressAnswer: {
    flex: 1,
  },
  progressBarContainer: {
    flex: 2.5,
  },
  progressBar: {
    height: 10,
    backgroundColor: color.Lavendar[100],
    borderWidth: 1,
    borderColor: color.Lavendar[100],
    borderRadius: 12,
  },
});

export default PollCard;
