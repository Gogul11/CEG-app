import React, { useEffect } from 'react';
import { View, Image, Text } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const lineAnimation = useSharedValue(0);
  const navigation = useNavigation();

  useEffect(() => {
    // Animate the scanning line
    lineAnimation.value = withRepeat(
      withTiming(1, { duration: 2000, easing: Easing.linear }),
      -1,
      true
    );

    // Navigate to the next screen after 3 seconds
    const timer = setTimeout(() => {
      navigation.navigate('WelcomePage'); // Change 'WelcomePage' to your next screen
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    lineAnimation.value = withRepeat(
            withTiming(1, { duration: 2000, easing: Easing.linear }),-1, true
        );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: lineAnimation.value * 220 }],
    };
  });

  return (
    <View className="flex-1 justify-center items-center" style={{ backgroundColor: '#021438' }}>
      <View className="relative w-[300px] h-[230px]">
        <Image
          source={require('./assets/images/fingerprint.png')} 
          style={{
            width: 300,
            height: 230,
            opacity: 0.95,
            filter: 'invert(100%) sepia(60%) saturate(3000%) hue-rotate(0deg) brightness(95%) contrast(80%)',
          }}
          resizeMode="contain"
        />

        {/* Moving Line (Simulating ::after) */}
        <Animated.View
          style={[
            animatedStyle,
            {
                position: 'absolute',
                top: 0,
                left: 50,
                width: 200,
                height: 8,
                backgroundColor: '#4ade80',
                borderRadius: 8,
                boxShadow: '0px 0px 50px 20px rgba(74, 222, 128, 1)',
              }
          ]}
        />

      </View>
    </View>
  );
};

export default Home;