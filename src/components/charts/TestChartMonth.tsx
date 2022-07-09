import React from 'react';
import {StyleSheet} from 'react-native';
import {LineChart} from 'react-native-chart-kit';

const TestChartMonth = () => {
  return (
    <LineChart
      data={{
        labels: ['Week 1', 'Week 2', 'Week3', 'Week4'],
        datasets: [
          {
            data: [
              Math.floor(Math.random() * 40),
              Math.floor(Math.random() * 60),
              Math.floor(Math.random() * 100),
              Math.floor(Math.random() * 190),
            ],
          },
        ],
      }}
      width={500} // from react-native
      height={188}
      withHorizontalLabels={false}
      yAxisInterval={2} // optional, defaults to 1
      chartConfig={{
        backgroundColor: '#FFFFFF',
        backgroundGradientFrom: '#FFFFFF',
        backgroundGradientTo: '#FFFFFF',
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(114, 78, 250, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        style: {
          borderRadius: 16,
        },
        propsForLabels: {
          fontWeight: '700',
        },

        propsForDots: {
          r: '0',
          strokeWidth: '9',
          stroke: '#ffa726',
        },
        propsForBackgroundLines: {
          stroke: '#FFFFFF',
        },
      }}
      bezier
      style={{
        marginVertical: 30,
        marginTop: -50,
        borderRadius: 16,
        zIndex: -1,
        marginLeft: 40,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    />
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TestChartMonth;
