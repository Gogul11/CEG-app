import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBackStore } from '../backStore';
import { StatusBar } from 'react-native';

const Index = () => {
    const router = useRouter();

    const setBack = useBackStore((state) => state.setBack)

    useEffect(() => {
        setBack(true)
    }, [])

    return (
        <SafeAreaView className='flex-1 gap-2 justify-center p-4  bg-white'>
            <StatusBar barStyle='light-content'/>
            <Button
                onPress={() => router.push('(app1)')}
                title="app1"
            />
            <Button
                onPress={() => router.push('(app2)')}
                title="app2"
            />
            <Button
                onPress={() => router.push('(app3)/(tabs)')}
                title="app3"
            />
            <Button
                onPress={() => router.push('(auth)/sign-in')}
                title="Sign-In"
            />
            <Button
                onPress={() => router.push('(auth)/sign-up')}
                title="Sign-Up"
            />
            <Button
                onPress={() => router.push('profile')}
                title="Profile"
            />
        </SafeAreaView>
    );
};

export default Index;
