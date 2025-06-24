import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ClubScreen from '../screens/Clubscreens';
import Announcement from '../screens/AnnouncementsScreen';
import AboutClubscreen from '../screens/AboutClubsScreen';
import ClubDetailsScreen from '../screens/ClubDetailsScreen';
import OpenCallAdmin from '../screens/OpenCallAdmin';
import OrganisersOpenCall from '../screens/OrganiserOpenCall';

import DatePickerModal from '../screens/DatePickerModal';
import OpenCallAdmincopy from '../screens/OpenCallAdmincopy';
import Home from '../Home';
import index from '../index';
import SignUpScreen from '../SignUpScreen';
import LoginScreen from '../LoginScreen';
import WelcomePage from '../WelcomePage';
import EventListScreen from '../EventListScreen';
import EventDetailsScreen from '../EventDetailsScreen';
import GeneralCalender from '../GeneralCalender';
import about from '../about';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="index" component={index} options={{ headerShown: false }} />
      <Stack.Screen name="about" component={about} options={{ headerShown: false }} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerShown: false }} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="WelcomePage" component={WelcomePage} options={{ headerShown: false }} />
      <Stack.Screen name="EventListScreen" component={EventListScreen} options={{ headerShown: false }} />
      <Stack.Screen name="EventDetailsScreen" component={EventDetailsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="GeneralCalender" component={GeneralCalender} options={{ headerShown: false }} />
      <Stack.Screen name="Club" component={ClubScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Announcements" component={Announcement} options={{ headerShown: false }} />
      <Stack.Screen name="About Clubs" component={AboutClubscreen} options={{ headerShown: false }} />
      <Stack.Screen name="Club Details" component={ClubDetailsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Open Call Admin" component={OpenCallAdmin} options={{ headerShown: false }} />
      <Stack.Screen name="Open Call Admin copy" component={OpenCallAdmincopy} options={{ headerShown: false }} />
      <Stack.Screen name="OrganiserOpenCall" component={OrganisersOpenCall} options={{ headerShown: false }} />
      <Stack.Screen name="DatePickerModal" component={DatePickerModal} options={{ headerShown: false }} />
    </Stack.Navigator>

  )
};

export default AppNavigator;
