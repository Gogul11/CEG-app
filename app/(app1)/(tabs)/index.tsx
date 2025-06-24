import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Portals from './Portals'; // Ensure this is the correct path to your Portals component
import AttendanceScreen from './AttendanceScreen'; // Ensure this is the correct path to your AttendanceScreen component
import CustomDrawerContent from './CustomDrawerContent'; // Ensure this is the correct path to your CustomDrawerContent component
import CGPACalculator from "./CGPACalculator";
import CustomSplashScreen from "./CustomSplashScreen"; // Ensure this is the correct path to your CustomSplashScreen component

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const App = () => {
  // const [isSplashVisible, setIsSplashVisible] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsSplashVisible(false);
  //   }, 3000); // Adjust the duration as needed

  //   return () => clearTimeout(timer);
  // }, []);

  // if (isSplashVisible) {
  //   return <CustomSplashScreen />;
  // }

  return (
    <SafeAreaProvider>
      {/* <StatusBar style="light" translucent backgroundColor="transparent" /> */}
      <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="CGPA Calculator" component={CGPACalculator} />
        <Drawer.Screen name="Attendance Tracker" component={AttendanceScreen} />
        <Drawer.Screen name="Portals" component={Portals} />
      </Drawer.Navigator>
    </SafeAreaProvider>
  );
};

export default App;