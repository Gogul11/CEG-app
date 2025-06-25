import { Stack } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import '../global.css'

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{headerShown : false}}/>   
      <Stack.Screen name='(app1)' />
      <Stack.Screen name='(app2)'/>
      <Stack.Screen name='(tab3)'/>
    </Stack>
  );
}

export default Layout;
