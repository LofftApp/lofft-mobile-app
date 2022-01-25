import React, {useContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import RNBootSplash from 'react-native-bootsplash';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import functions from '@react-native-firebase/functions';

import {navigationRef} from './src/RootNavigation';
import {Context as AuthContext} from './src/context/AuthContext';
import {Provider as AuthProvider} from './src/context/AuthContext';
// Screens
import {UserComponents} from './src/components/UserComponents';
import HomeScreen from './src/screens/HomeScreen';
import SigninScreen from './src/screens/visitorScreens/SigninScreen';
import SignupScreen from './src/screens/visitorScreens/SignupScreen';
import PendingPaymentsScreen from './src/screens/userScreens/PendingPaymentsScreen';
import MakePaymentScreen from './src/screens/userScreens/MakePaymentScreen';
import PaymentConfirmationScreen from './src/screens/userScreens/PaymentConfirmationScreen';
import PaidConfirmationScreen from './src/screens/userScreens/PaidConfirmationScreen';
import UserOptionsScreen from './src/screens/userScreens/UserOptionsScreen';
import ProfileScreen from './src/screens/userScreens/ProfileScreen';

const Stack = createStackNavigator();

const App = () => {
  const {state, activeUser} = useContext(AuthContext);
  // Firebase initialize values
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Firebase Dev check
  if (__DEV__) {
    functions().useFunctionsEmulator('http://localhost:4000');
  }

  const db = firestore();

  // Firebase handle user state change
  const onAuthStateChanged = userStateChange => {
    setUser(userStateChange);
    if (initializing) {
      setInitializing(false);
    }
  };

  useEffect(() => {
    const bootstrapAsync = async () => {
      activeUser();
    };
    // New Authentication code from Firebase
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    bootstrapAsync();
    return subscriber;
  }, []);

  if (initializing) return null;

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
            name="PayNow"
            component={PendingPaymentsScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="MakePayment"
            component={MakePaymentScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ConfirmPayment"
            component={PaymentConfirmationScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="PaymentConfirmation"
            component={PaidConfirmationScreen}
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
    <AuthProvider>
      <NavigationContainer
        ref={navigationRef}
        onReady={() => RNBootSplash.hide()}>
        <App />
      </NavigationContainer>
    </AuthProvider>
  );
};
