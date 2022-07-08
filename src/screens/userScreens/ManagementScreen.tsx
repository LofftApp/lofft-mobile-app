// React ⚛
import React, {useState, useCallback} from 'react';

// React Native 📱
import {View, Platform, SafeAreaView, ScrollView} from 'react-native';

// Components 🪢
import HeaderBar from '../../components/bannersAndBars/HeaderBar';
import ToggleBar from '../../components/bannersAndBars/ToggleBar';
import PollsManagement from '../../components/screenComponents/PollsManagement';
import EventsManagement from '../../components/screenComponents/EventsManagement';

// StyleSheets 🌈
import {CoreStyleSheet} from '../../StyleSheets/CoreDesignStyleSheet';

const ManagementScreen = ({navigation}: any) => {
  // User Hooks
  const [image, setImage]: any = useState('');
  // Hooks
  const [calendarActive, setCalendarActive] = useState(true);

  const buttonToggle = useCallback(toggled => {
    setCalendarActive(toggled);
  }, []);

  return (
    <View
      style={[
        CoreStyleSheet.viewContainerStyle,
        Platform.OS === 'ios' ? CoreStyleSheet.viewContainerIOSStyle : null,
      ]}>
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <HeaderBar title="Management" image={image} />

          <ToggleBar
            optionA="Events & Calendar"
            optionB="Polls"
            dashboard={buttonToggle}
          />

          {calendarActive ? (
            <EventsManagement navigation={navigation} />
          ) : (
            <PollsManagement navigation={navigation} />
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default ManagementScreen;
