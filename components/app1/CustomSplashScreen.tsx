import React, { useEffect } from 'react';
import { View, Image, StyleSheet, StatusBar } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const CustomSplashScreen = () => {
  const scaleAnimation = useSharedValue(1);
  const opacityAnimation = useSharedValue(1);
  const navigation = useNavigation(); // Initialize navigation

  useEffect(() => {
    // First, create the "beating" effect
    scaleAnimation.value = withTiming(1.2, {
      duration: 500,
      easing: Easing.inOut(Easing.ease),
    }, () => {
      // After the first beat, zoom in like a blast
      scaleAnimation.value = withTiming(5, {
        duration: 500,
        easing: Easing.inOut(Easing.ease),
      });
      // Fade out the splash screen
      opacityAnimation.value = withTiming(0, {
        duration: 500,
        easing: Easing.inOut(Easing.ease),
      }, () => {
        // Navigate to the home screen after the animation completes
        // Ensure this matches your navigation stack
      });
    });
  }, [navigation]); // Add navigation to the dependency array

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleAnimation.value }],
      opacity: opacityAnimation.value,
    };
  });

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Animated.View style={[styles.imageContainer, animatedStyle]}>
        <Image
          source={require('./assets/images/CEGSYNC.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  imageContainer: {
    width: 300,
    height: 230,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    opacity: 0.95,
    alignItems: 'center',
  },
});

export default CustomSplashScreen;