import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBackStore } from '../backStore';
import { StatusBar } from 'react-native';
import CustomButton from '../components/button';

const Index = () => {
    const router = useRouter();

    const setBack = useBackStore((state) => state.setBack)

    useEffect(() => {
        setBack(true)
    }, [])

    return (
        <SafeAreaView className='flex-1 gap-2 justify-center items-center p-4  bg-white'>
            <StatusBar barStyle='light-content'/>
            <CustomButton 
                text="app1"
                buttonFunction={() => router.push('(app1)')}
            />
            <CustomButton 
                text="app2"
                buttonFunction={() => router.push('(app2)')}
            />
            <CustomButton 
                text="app3"
                buttonFunction={() => router.push('(app3)/(tabs)')}
            />
            <CustomButton 
                text="Sign-In"
                buttonFunction={() => router.push('(auth)/sign-in')}
            />
            <CustomButton 
                text="Sign-Up"
                buttonFunction={() => router.push('(auth)/sign-up')}
            />
            <CustomButton 
                text="Profile"
                buttonFunction={() => router.push('profile')}
            />
        </SafeAreaView>
    );
};

export default Index;
