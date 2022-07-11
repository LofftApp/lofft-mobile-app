import React from 'react';
import {LineChart} from 'react-native-chart-kit';

const TestChartYear = () => {
  return (
    <LineChart
      data={{
        labels: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        datasets: [
          {
            data: [
              Math.floor(Math.random() * 300),
              Math.floor(Math.random() * 300),
              Math.floor(Math.random() * 300),
              Math.floor(Math.random() * 300),
              Math.floor(Math.random() * 300),
              Math.floor(Math.random() * 300),
              Math.floor(Math.random() * 450),
              Math.floor(Math.random() * 300),
              Math.floor(Math.random() * 300),
              Math.floor(Math.random() * 300),
              Math.floor(Math.random() * 300),
              Math.floor(Math.random() * 300),
            ],
          },
        ],
      }}
      width={420} // from react-native
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
        paddingRight: 70,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    />
  );
};

export default TestChartYear;
