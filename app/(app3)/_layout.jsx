import { SplashScreen, Stack } from 'expo-router';
import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import { StatusBar } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import FingerprintScanner from './components/home';

// SplashScreen.preventAutoHideAsync();

const AppRootLayout = () => {
  // const [fontsLoaded, error] = useFonts({
  //   "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
  //   "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
  //   "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
  //   "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
  // });

  // const [load, setLoad] = useState(false);

  // useEffect(() => {
  //   if (error) {
  //     console.log(error);
  //     return;
  //   }
  //   if (fontsLoaded) {
  //     SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded, error]);

  // useEffect(() => {
  //   const timer = setTimeout(() => setLoad(true), 4000);
  //   return () => clearTimeout(timer);
  // }, []);

  const GradientHeader = () => (
    <LinearGradient
      colors={['#fff', '#38bdf8']}
      style={{ flex: 1 }}
    />
  );

  // if (!fontsLoaded) return null;

  return (
    <>
      <StatusBar barStyle='dark-content' backgroundColor='#fff'/>
      {/* {!load ? (
        <FingerprintScanner />
      ) : ( */}
        <Stack>
          <Stack.Screen
              name="(tabs)"
              options={{
                headerShown: false,
              }}
          />
          <Stack.Screen
              name="(auth)"
              options={{
                headerShown: false,
              }}
          />
          <Stack.Screen
              name="itemDescription"
              options={{
                title: "Description",
                headerShown: true,
                headerBackground: () => <GradientHeader />, // Gradient for header
                headerTintColor: "white",
              }}
          />
        </Stack>
      {/* )} */}
    </>
  );
};

export default AppRootLayout;