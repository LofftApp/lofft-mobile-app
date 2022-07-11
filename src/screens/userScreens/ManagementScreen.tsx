// React ⚛
import React, {useState, useCallback} from 'react';

// React Native 📱
import {SafeAreaView, ScrollView} from 'react-native';

// Components 🪢
import RootPage from '@Pages/RootPage';
import ToggleBar from '@Bars/ToggleBar';
import PollsManagement from '@ScreenComponents/PollsManagement';
import EventsManagement from '@ScreenComponents/EventsManagement';

const ManagementScreen = ({navigation}: any) => {
  // User Hooks
  const [image]: any = useState('');
  // Hooks
  const [calendarActive, setCalendarActive] = useState(true);

  const buttonToggle = useCallback(toggled => {
    setCalendarActive(toggled);
  }, []);

  return (
    <RootPage name="Management" image={image}>
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
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
    </RootPage>
  );
};

export default ManagementScreen;
