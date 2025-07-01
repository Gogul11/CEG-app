import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';

const App1Layout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#000',
        tabBarStyle: {
          borderTopWidth: 0,
          height: 55,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen name="back" options={{ title: 'Back' }} />
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="CGPACalculator" options={{ title: 'CGPA' }} />
      <Tabs.Screen name="AttendanceScreen" options={{ title: 'Attendance' }} />
      <Tabs.Screen name="Portals" options={{ title: 'Portals' }} />
    </Tabs>
  );
};

const styles = StyleSheet.create({});

export default App1Layout;
