import React, {useEffect, useState} from 'react';
import {LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import RNBootSplash from 'react-native-bootsplash';

import {navigationRef} from './src/RootNavigation';
// Screens
import {UserComponents} from './src/components/UserComponents';
import HomeScreen from './src/screens/HomeScreen';
import SigninScreen from './src/screens/visitorScreens/SigninScreen';
import SignupScreen from './src/screens/visitorScreens/SignupScreen';
import UserOptionsScreen from './src/screens/userScreens/UserOptionsScreen';
import ProfileScreen from './src/screens/userScreens/ProfileScreen';

// Finance Screens
import BillOverviewsScreen from './src/screens/financeScreens/BillOverviewsScreen';
import PendingPaymentsScreen from './src/screens/financeScreens/PendingPaymentsScreen';
import MakePaymentScreen from './src/screens/financeScreens/MakePaymentScreen';
import PaymentSelectScreen from './src/screens/financeScreens/PaymentSelectScreen';
import PaidConfirmationScreen from './src/screens/financeScreens/PaidConfirmationScreen';

// Management Screens
import MakeNewPollScreen from './src/screens/managementScreens/MakeNewPollScreen';
import MakeNewEventScreen from './src/screens/managementScreens/MakeNewEventScreen';

import DeadlineScreen from './src/screens/managementScreens/DeadlineScreen';
import EventConfirmationScreen from './src/screens/managementScreens/EventConfirmationScreen';
import PollConfirmationScreen from './src/screens/managementScreens/PollConfirmationScreen';

// FireStore
import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';
import firestore from '@react-native-firebase/firestore';
// import storage from '@react-native-firebase/storage';

// Appartment Screens
import AddApartmentScreen from './src/screens/apartmentScreens/AddApartmentScreen';
import JoinApartmentScreen from './src/screens/apartmentScreens/JoinApartmentScreen';
import ViewApartmentScreen from './src/screens/apartmentScreens/ViewApartmentScreen';

const Stack = createStackNavigator();

const App = () => {
  // Inhibit Error Message
  LogBox.ignoreLogs([
    "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
  ]);

  // Firebase initialize values
  const [user, setUser] = useState(null);

  useEffect(() => {
    // New Authentication code from Firebase
    const unsubscribe = auth().onAuthStateChanged(user => {
      user ? setUser(user) : setUser(null);
    });
    if (__DEV__) {
      console.log('FireStore Development Environment');
      let host = 'localhost';
      // If using Mobile device set the host as local IP
      // host = '192.168.0.123';
      firestore().useEmulator(host, 8080);
      auth().useEmulator(`http://${host}:9099`);
    }
    return () => unsubscribe();
  }, []);

  return (
    <Stack.Navigator initialRouteName="UserComponents, {screen: 'Costs'}">
      {user ? (
        <>
          {/* Billing and Finance Screens */}
          <Stack.Screen
            name="UserComponents"
            component={UserComponents}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="BillOverview"
            component={BillOverviewsScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="PendingPayments"
            component={PendingPaymentsScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="MakePayment"
            component={MakePaymentScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="PaymentSelect"
            component={PaymentSelectScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="PaymentConfirmation"
            component={PaidConfirmationScreen}
            options={{headerShown: false}}
          />

          {/* Management Screens */}

          <Stack.Screen
            name="MakeNewPoll"
            component={MakeNewPollScreen}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="MakeNewEvent"
            component={MakeNewEventScreen}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="EventConfirmation"
            component={EventConfirmationScreen}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="PollConfirmation"
            component={PollConfirmationScreen}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="MakeDeadlinePoll"
            component={DeadlineScreen}
            options={{headerShown: false}}
          />

          {/* Settings and Profile Management */}
          <Stack.Screen
            name="UserOptions"
            component={UserOptionsScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ProfileScreen"
            component={ProfileScreen}
            options={{headerShown: false}}
          />
          {/* Apartment Management Screens */}
          <Stack.Screen
            name="ViewApartment"
            component={ViewApartmentScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AddApartment"
            component={AddApartmentScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="JoinApartment"
            component={JoinApartmentScreen}
            options={{headerShown: false}}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{title: 'Lofft', headerShown: false}}
          />
          <Stack.Screen
            name="Signin"
            component={SigninScreen}
            options={{title: 'Sign in', headerShown: false}}
          />
          <Stack.Screen
            name="Signup"
            component={SignupScreen}
            options={{title: 'Sign up', headerShown: false}}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default () => {
  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => RNBootSplash.hide()}>
      <App />
    </NavigationContainer>
  );
};
