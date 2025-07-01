import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet } from "react-native";

const EVVehicle = () => {
  const translateY = useRef(new Animated.Value(500)).current; // Start from bottom

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: -300, // Move to top
      duration: 3000, // 3 seconds duration
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.ev,
          { transform: [{ translateY }] } // Moves upwards
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-end", // Start from bottom
    alignItems: "center",
  },
  ev: {
    width: 50,
    height: 100,
    backgroundColor: "#4ade80",
    borderRadius: 10,
  },
});

export default EVVehicle;
