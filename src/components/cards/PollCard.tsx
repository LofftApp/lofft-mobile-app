import React from 'react';
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
  return (
    <ImageBackground
      source={HalfBackgroundImage}
      style={styles.ItemPendingPayment}>
      <View style={styles.textContainer}>
        <View style={styles.deadLineStyle}>
          <Text style={[fontStyles.buttonTextSmall, {color: color.White[100]}]}>
            Ends {deadline}
          </Text>
        </View>
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
    borderRadius: 20,
    width: '40%',
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
