import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';

// Stylesheets
import {CoreStyleSheet} from '../../StyleSheets/CoreDesignStyleSheet';
import {fontStyles} from '../../StyleSheets/FontStyleSheet';

// Components
import {CoreButton} from '../../components/buttons/CoreButton';
import CustomBackButton from '../../components/buttons/CustomBackButton';
import CalendarManagement from '../../components/calendar/CalendarManagement';

const DeadlineScreen = ({ navigation, route }: any) => {
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

      <CalendarManagement fetchdate={route.params.fetchdate.fetchdate}  />

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
  addDeadlineButtonContainer:{
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'flex-start',
  },

  addDeadlineButtonContainer:{
    marginVertical: 240,
  },

  button: {
    marginVertical: 5,
  },
});

export default DeadlineScreen;
