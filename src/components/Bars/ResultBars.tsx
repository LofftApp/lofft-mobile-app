import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

// Assets 🖼
import * as color from '@Assets/lofftColorPallet.json';

const ResultBars = ({answers, userAnswers, inactive = false}) => {
  const accumulatorCalculator = votes => {
    const totalVotes = Object.keys(votes).length;
    let results = {};
    answers.forEach(answer => {
      results[answer] = 0;
    });
    Object.values(userAnswers).forEach(answer => {
      results[answer] = results[answer] + 1;
    });
    Object.keys(results).forEach(key => {
      results[key] = Math.floor((results[key] / totalVotes) * 100);
    });
    return results;
  };

  const votePercentages = accumulatorCalculator(userAnswers);
  // return null;
  return Object.keys(votePercentages).map(ans => {
    return (
      <View key={ans} style={styles.barContainer}>
        <Text style={styles.progressAnswer}>{ans}</Text>
        <View style={styles.progressBarContainer}>
          <View
            style={[
              styles.progressBar,
              inactive ? styles.inactive : null,
              {width: `${votePercentages[ans]}%`},
            ]}
          />
        </View>
      </View>
    );
  });
};

const styles = StyleSheet.create({
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
  inactive: {
    backgroundColor: color.Black[30],
    borderColor: color.Black[30],
  },
});

export default ResultBars;
