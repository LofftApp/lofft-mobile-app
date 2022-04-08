/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';

import {View, Text, StyleSheet} from 'react-native';

import {RadioButton} from 'react-native-paper';
import {differentApproach} from '../../api/firebase/fireStoreActions';

import color from '../../assets/defaultColorPallet.json';

const RadioButtonPolls = ({anwsers, selectQuestionById, questionId}) => {
  const [checked, setChecked] = useState('');

  const randomNumber = () => {
    const num = `0.${Math.floor(Math.random() * 10 + 1)}`;
    let formatedNum = Number(num);

    if (formatedNum >= 0.9) {
      formatedNum = 0.8;
    }

    return formatedNum;
  };

  return (
    <View>
      {anwsers.map((el, index) => (
        <View key={index + 2}>
          <View key={index + 3} style={styles.anwserContainer}>
            <View key={index + 4} style={{flex: 0.2}}>
              <RadioButton
                value={el}
                key={index + 1}
                status={checked === el ? 'checked' : 'unchecked'}
                onPress={() => [
                  setChecked(el),
                  selectQuestionById(questionId),
                  // differentApproach(),
                ]}
                color="#6D4FF1"
              />
            </View>
            <View key={index + 5} style={{flex: 0.8}}>
              <Text key={index + 6}>{el}</Text>
            </View>
          </View>

          <View
            key={index + 7}
            style={{display: 'flex', flexDirection: 'row', overflow: 'hidden'}}>
            <View
              key={index + 8}
              style={{
                flex: 0.2,
                overflow: 'hidden',
                height: 2,
              }}
            />
            <View
              key={index + 9}
              style={{
                backgroundColor: color.Lavendar[100],
                borderRadius: 20,
                height: 4,
                flex: randomNumber(),
                overflow: 'hidden',
              }}
            />
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  anwserContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default RadioButtonPolls;
