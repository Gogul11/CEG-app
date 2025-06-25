import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet, View, Button, Text, SafeAreaView } from 'react-native';
import { useBackStore } from '../backStore';

const Index = () => {
    const router = useRouter();

    const setBack = useBackStore((state) => state.setBack)

    useEffect(() => {
        setBack(true)
    }, [])

    return (
        <SafeAreaView className='flex gap-2 justify-center m-4'>
            <Button
                onPress={() => router.push('(app1)')}
                title="app1"
            />
            <Button
                onPress={() => router.push('(app2)')}
                title="app2"
            />
            <Button
                onPress={() => router.push('(app3)')}
                title="app3"
            />
        </SafeAreaView>
    );
};

export default Index;
