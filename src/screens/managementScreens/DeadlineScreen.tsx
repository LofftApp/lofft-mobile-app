import React from 'react';

import {View, StyleSheet, Platform} from 'react-native';

// Stylesheets
import {CoreStyleSheet} from '@StyleSheets/CoreDesignStyleSheet';

// Components
import {CoreButton} from '@Buttons/CoreButton';
import CustomBackButton from '@Buttons/CustomBackButton';
import CalendarManagement from '@Calendar/CalendarManagement';

const DeadlineScreen = ({navigation, route}: any) => {
  // console.log(`Hello this is the deadlinescreen:${route.params.fetchdate.fetchdate}`);
  return (
    <View
      style={[
        CoreStyleSheet.viewContainerStyle,
        Platform.OS === 'ios' ? CoreStyleSheet.viewContainerIOSStyle : null,
      ]}>
      <CustomBackButton
        onPress={() => navigation.goBack()}
        title="Set Deadline"
      />

      <CalendarManagement fetchdate={route.params.fetchdate.fetchdate} />

      <View style={styles.addDeadlineButtonContainer}>
        <CoreButton
          value="Add new event"
          style={styles.button}
          invert
          onPress={() => navigation.goBack()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  addDeadlineButtonContainer: {
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'flex-start',
  },
  button: {
    marginVertical: 5,
  },
});

export default DeadlineScreen;
