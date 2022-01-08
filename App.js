import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {navigationRef} from './src/RootNavigation';
import {Provider as AuthProvider} from './src/context/AuthContext';
// Screens
import HomeScreen from './src/screens/HomeScreen';
import SigninScreen from './src/screens/visitorScreens/SigninScreen';
// import SignupScreen from './src/screens/visitorScreens/SignupScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Stack.Navigator>
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
