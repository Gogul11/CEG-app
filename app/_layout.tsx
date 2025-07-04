import { Stack } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import '../global.css'

const Layout = () => {
  return (
      <Stack>
        <Stack.Screen name="index" options={{headerShown : false}}/>   
        <Stack.Screen name='(app1)' options={{headerShown : false}}/>
        <Stack.Screen name='(app2)'/>
        <Stack.Screen name='(app3)' options={{headerShown : false}}/>
        <Stack.Screen name='(auth)' options={{headerShown : false}}/>
        <Stack.Screen name='profile' />
      </Stack>
  );
}

export default Layout;
