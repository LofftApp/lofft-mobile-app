import React, {useEffect, useState} from 'react';
import {LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import RNBootSplash from 'react-native-bootsplash';
import {Provider as UserDetails} from './src/context/UserDetailsContext';
import {navigationRef} from './src/RootNavigation';
// Screens
import {UserComponents} from '@Components/UserComponents';
import HomeScreen from '@screens/HomeScreen';
import SigninScreen from '@VisitorScreens/SigninScreen';
import SignupScreen from '@VisitorScreens/SignupScreen';
import UserOptionsScreen from '@UserScreens/UserOptionsScreen';
import ProfileScreen from '@UserScreens/ProfileScreen';

// Finance Screens
import BillOverviewsScreen from '@FinanceScreens/BillOverviewsScreen';
import PendingPaymentsScreen from '@FinanceScreens/PendingPaymentsScreen';
import MakePaymentScreen from '@FinanceScreens/MakePaymentScreen';
import PaymentSelectScreen from '@FinanceScreens/PaymentSelectScreen';
import PaidConfirmationScreen from '@FinanceScreens/PaidConfirmationScreen';

// Management Screens
import MakeNewPollScreen from '@ManagementScreens/MakeNewPollScreen';
import MakeNewEventScreen from '@ManagementScreens/MakeNewEventScreen';
import DeadlineScreen from '@ManagementScreens/DeadlineScreen';
import EventConfirmationScreen from '@ManagementScreens/EventConfirmationScreen';
import PollConfirmationScreen from '@ManagementScreens/PollConfirmationScreen';

// Appartment Screens
import AddApartmentScreen from '@ApartmentScreens/AddApartmentScreen';
import JoinApartmentScreen from '@ApartmentScreens/JoinApartmentScreen';
import LofftProfile from '@ApartmentScreens/LofftProfile';

// FireStore
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

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
      // host = '192.168.7.156';
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
            name="LofftProfile"
            component={LofftProfile}
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
    <UserDetails>
      <NavigationContainer
        ref={navigationRef}
        onReady={() => RNBootSplash.hide()}>
        <App />
      </NavigationContainer>
    </UserDetails>
  );
};
