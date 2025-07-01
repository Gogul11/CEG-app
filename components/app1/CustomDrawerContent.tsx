import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomDrawerContent = (props) => {
  const clearLocalStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log('Local storage cleared');
    } catch (error) {
      console.error('Error clearing local storage:', error);
    }
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <View style={styles.buttonContainer}>
        <Button title="Clear Local Storage" onPress={clearLocalStorage} />
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderColor: '#E0E0E0',
  },
});

export default CustomDrawerContent;