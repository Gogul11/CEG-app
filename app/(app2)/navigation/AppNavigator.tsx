import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import ClubScreen from '../screens/Clubscreens';
import Announcement from '../screens/AnnouncementsScreen';
import AboutClubscreen from '../screens/AboutClubsScreen';
import Home from '../screens/Home';
import WelcomePage from '../screens/WelcomePage';
import EventListScreen from '../screens/EventListScreen';
import about from '../screens/about';

const Tab = createBottomTabNavigator();

const AppNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'WelcomePage') iconName = 'happy';
          else if (route.name === 'EventListScreen') iconName = 'calendar';
          else if (route.name === 'Club') iconName = 'people';
          else if (route.name === 'Announcements') iconName = 'megaphone';
          else if (route.name === 'about') iconName = 'information-circle';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="WelcomePage" component={WelcomePage} />
      <Tab.Screen name="EventListScreen" component={EventListScreen} />
      <Tab.Screen name="Club" component={ClubScreen} />
      <Tab.Screen name="Announcements" component={Announcement} />
      <Tab.Screen name="about" component={about} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
