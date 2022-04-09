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

const PollCard = ({value}) => {
  const [pollValue] = useState(value.data());
  const [date] = useState(
    pollValue.deadline ? pollValue.deadline.seconds * 1000 : null,
  );
  const unitToTen = v => {
    return v.toString().length === 1 ? `0${v}` : v;
  };
  const convertDate = newDate => {
    const toDate = new Date(newDate);
    const day = unitToTen(toDate.getDate());
    const month = unitToTen(toDate.getMonth() + 1);
    return `${day} - ${month} - ${toDate.getFullYear()}`;
  };

  return (
    <ImageBackground
      source={HalfBackgroundImage}
      style={styles.ItemPendingPayment}>
      <View style={styles.textContainer}>
        {date ? (
          <View style={styles.deadLineStyle}>
            {
              <Text
                style={[fontStyles.buttonTextSmall, {color: color.White[100]}]}>
                Ends {convertDate(date)}
              </Text>
            }
          </View>
        ) : null}
        <Text style={[fontStyles.bodySmall, styles.value]}>
          {pollValue.question}
        </Text>
        <View style={styles.answerContainer}>
          {pollValue.answers.map((ans, index) => {
            return (
              <TouchableOpacity
                key={ans}
                style={styles.answer}
                onPress={() => {
                  votePoll(value.id, index);
                }}>
                <Text>{ans}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
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
    // marginBottom: 15,
  },
  deadLineStyle: {
    backgroundColor: color.Mint[100],
    color: color.White[100],
    borderRadius: 5,
    maxWidth: '55%',
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
    marginVertical: 0,
    lineHeight: 35,
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
});

export default PollCard;
