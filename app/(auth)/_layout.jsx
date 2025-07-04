import React from "react";
import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: true,
        }}
      >
        <Stack.Screen index name="sign-in" options={{title : 'Sign In'}}/>
        <Stack.Screen name="sign-up" options={{title : 'Sign Up'}}/>
        <Stack.Screen name="otp-section" options={{title : 'Enter OTP'}}/>
        <Stack.Screen name="forget-password" options={{title : 'Change Password'}}/>
      </Stack>
    </>
  );
};

export default AuthLayout;
