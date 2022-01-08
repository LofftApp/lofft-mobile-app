import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {navigationRef} from './src/RootNavigation';
// Screens
import HomeScreen from './src/screens/HomeScreen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{title: 'Lofft', headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <App />
    </NavigationContainer>
  );
};
