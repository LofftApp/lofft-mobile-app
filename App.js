import React, {useContext, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

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

const Stack = createStackNavigator();

const App = () => {
  const {state, activeUser} = useContext(AuthContext);

  useEffect(() => {
    const bootstrapAsync = async () => {
      activeUser();
    };
    bootstrapAsync();
  }, []);

  return (
    <Stack.Navigator initialRouteName="UserComponents, {screen: 'Costs'}">
      {state.token ? (
        <>
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
      <NavigationContainer ref={navigationRef}>
        <App />
      </NavigationContainer>
    </AuthProvider>
  );
};
