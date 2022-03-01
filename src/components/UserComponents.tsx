/* eslint-disable no-shadow */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import color from '../assets/defaultColorPallet.json';

// Screens
import DashboardScreen from './../screens/userScreens/DashboardScreen';
import CostsScreen from '../screens/userScreens/HomeScreen';
import ApartmentScreen from './../screens/userScreens/ApartmentScreen';
import SettingsScreen from './../screens/userScreens/SettingsScreen';

const BottomTab = createBottomTabNavigator();

export const UserComponents = () => {
  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarInactiveTintColor: color.Lavendar[50],
        tabBarActiveTintColor: color.Lavendar[100],
      }}>
      <BottomTab.Screen
        name="Dashboard"
        // to be changed
        component={CostsScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="home-outline" color={color} size={30} />
          ),
          headerShown: false,
        }}
      />
      <BottomTab.Screen
        name="Appartment"
        component={ApartmentScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="pizza-outline" color={color} size={30} />
          ),
          headerShown: false,
        }}
      />
      <BottomTab.Screen
        name="Costs"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="cash-outline" color={color} size={30} />
          ),
          headerShown: false,
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="notifications-outline" color={color} size={30} />
          ),
          headerShown: false,
        }}
      />
    </BottomTab.Navigator>
  );
};
