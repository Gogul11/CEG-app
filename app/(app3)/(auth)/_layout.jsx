import { StatusBar } from "react-native";
import React from "react";
import { Slot, Stack } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

// Custom Linear Gradient Header
const GradientHeader = () => (
  <LinearGradient
    colors={['#fff', '#38bdf8']}
    style={{ flex: 1 }}
  />
);

const AuthLayout = () => {
  return (
    <>
      {/* <StatusBar barStyle='dark-content' backgroundColor="#fff"  /> */}

      <Stack
        screenOptions={{
          headerShown: true,
          headerBackground: () => <GradientHeader />, // Gradient for header
          headerTintColor: "white",
        }}
      >
        <Stack.Screen name="sign-in" options={{title : 'Sign In'}}/>
        <Stack.Screen name="sign-up" options={{title : 'Sign Up'}}/>
        <Stack.Screen name="otp-section" options={{title : 'Enter OTP'}}/>
        <Stack.Screen name="forget-password" options={{title : 'Change Password'}}/>
      </Stack>

      {/* Ensure Slot is used correctly for nested routes */}
      {/* <Slot /> */}
    </>
  );
};

export default AuthLayout;
