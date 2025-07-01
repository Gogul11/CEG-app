import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Feather from '@expo/vector-icons/Feather';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';


const TabsLayout = () => {
  return (
    <Tabs 
    screenOptions={{
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#000',
        tabBarStyle: {
          borderTopWidth: 0,
          height : 55,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarBackground: () => (
          <LinearGradient
            colors={['#CBCBCB', '#898989']} // Define your gradient colors
            style={{ flex: 1 }}
          />
        ),
        headerShown: false,
      }}>
        <Tabs.Screen name='back' options={{
            headerShown : false,
            title:'Back',
            tabBarIcon :({focused}) => (
              <Ionicons name="arrow-back-outline" size={24} color={focused ? "white" : "#000"} />
            )
        }}/>
        <Tabs.Screen name="index" options={{
            headerShown : false,
            title : 'Home',
            
            tabBarIcon:({focused}) => <Feather name="home" size={24} color={focused ? "white" : "#000"} />
        }} />
        <Tabs.Screen name="items" options={{
            headerShown : false,
            title : 'Items',
            tabBarIcon:({focused}) => <Feather name="search" size={24} color={focused ? "white" : "#000"} />
        }}/>
        <Tabs.Screen name="addItem" options={{
            headerShown : false,
            title : 'Post',
            tabBarIcon:({focused}) => <Feather name="plus-square" size={24} color={focused ? "white" : "#000"} />
        }} />

        <Tabs.Screen name="campusMap" options={{
            headerShown : false,
            title : 'Map',
            tabBarIcon:({focused}) => (
                <Feather name="map-pin" size={24} color={focused ? "white" : "#000"} />
            )
        }}/>
    </Tabs>
  )
}

export default TabsLayout