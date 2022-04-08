import React, {useState} from 'react';
import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import color from '../../assets/defaultColorPallet.json';
import {fontStyles} from '../../StyleSheets/FontStyleSheet';
import HalfBackgroundImage from './../../assets/banner-background-half.png';
import {CoreButton} from '../buttons/CoreButton';
import RadioButtonPolls from '../buttons/RadioButtonPolls';

const PollCard = ({
  value,
  anwsers,
  deadline,
  multipleAnwser,
  questionId,
  selectQuestionById,
}) => {
  const [date] = useState(new Date(deadline.seconds * 1000));

  const unitToTen = value => {
    return value.toString.length === 1 ? `0${value}` : value;
  };
  const convertDate = date => {
    const day = unitToTen(date.getDay());
    const month = unitToTen(date.getMonth());
    return `${day} - ${month} - ${date.getFullYear()}`;
  };

  return (
    <ImageBackground
      source={HalfBackgroundImage}
      style={styles.ItemPendingPayment}>
      <View style={styles.textContainer}>
        {deadline ? (
          <View style={styles.deadLineStyle}>
            <Text
              style={[fontStyles.buttonTextSmall, {color: color.White[100]}]}>
              Ends {convertDate(date)}
            </Text>
          </View>
        ) : null}
        <Text style={[fontStyles.buttonTextMedium, styles.value]}>{value}</Text>
        <RadioButtonPolls
          questionId={questionId}
          selectQuestionById={selectQuestionById}
          anwsers={anwsers}
        />
      </View>
      {/* <CoreButton
        value="Question"
        invert={true}
        style={styles.button}
        onPress={buttonAction}
      /> */}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  ItemPendingPayment: {
    width: '100%',
    flexDirection: 'column',
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
});

export default PollCard;
