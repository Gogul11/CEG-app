import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const Back = () => {
  const r = useRouter()
  if(r.canGoBack())
    return r.back()
}

export default Back;
