import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';

const Index = () => {
    const router = useRouter();

    return (
        <View className='flex gap-2 justify-center m-4'>
            <Text
                className='text-blue-500'
            >this is gogul</Text>
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
        </View>
    );
};

export default Index;
