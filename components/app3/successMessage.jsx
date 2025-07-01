import React, { useRef, useEffect } from "react";
import { View, Text, Animated, Easing } from "react-native";

const SlideUpMessage = ({ message, visible, onHide }) => {
    const slideAnim = useRef(new Animated.Value(100)).current; // Starts off-screen

    useEffect(() => {
        if (visible) {
            // Slide up animation
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 500,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }).start();

            // Hide message after 3 seconds
            setTimeout(() => {
                Animated.timing(slideAnim, {
                    toValue: 100,
                    duration: 500,
                    useNativeDriver: true,
                }).start(() => onHide && onHide()); // Call onHide to reset state
            }, 3000);
        }
    }, [visible]);

    if (!visible) return null; // Hide when not visible

    return (
        <Animated.View
            style={{
                position: "absolute",
                bottom: 20,
                backgroundColor: "#A7E0FC",
                padding: 15,
                borderRadius: 10,
                opacity: 0.9,
                transform: [{ translateY: slideAnim }],
            }}
        >
            <Text className="text-white text-lg">{message}</Text>
        </Animated.View>
    );
};

export default SlideUpMessage;
