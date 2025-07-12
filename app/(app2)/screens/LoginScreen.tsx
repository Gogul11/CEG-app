"use client";
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Dimensions } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withDelay, Easing } from "react-native-reanimated";
import axios from "axios";
import env from "./utils/env";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "./utils/AuthContext";
const { width, height } = Dimensions.get("window");
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const LoginScreen = () => {
  const navigation = useNavigation();
const { setToken, setUser } = useAuth();
const API_URL = env.API_BASE_URL ;


  // State for username & password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Animations
  const backgroundOpacity = useSharedValue(0);
  const lightOpacity = useSharedValue(0);
  const lightScale = useSharedValue(0.8);
  const formTranslateY = useSharedValue(100);
  const formOpacity = useSharedValue(0);

  useEffect(() => {
    backgroundOpacity.value = withTiming(1, { duration: 1000, easing: Easing.bezier(0.25, 0.1, 0.25, 1) });
    lightOpacity.value = withDelay(500, withTiming(1, { duration: 1000 }));
    lightScale.value = withDelay(500, withTiming(1, { duration: 1000 }));
    formTranslateY.value = withDelay(800, withTiming(0, { duration: 1000 }));
    formOpacity.value = withDelay(800, withTiming(1, { duration: 1000 }));
  }, []);

  const backgroundStyle = useAnimatedStyle(() => ({ opacity: backgroundOpacity.value }));
  const lightStyle = useAnimatedStyle(() => ({ opacity: lightOpacity.value, transform: [{ scale: lightScale.value }] }));
  const formStyle = useAnimatedStyle(() => ({ opacity: formOpacity.value, transform: [{ translateY: formTranslateY.value }] }));

  // Handle Login
  const handleLogin = async () => {
    if (!username || !password) {
      alert("Please enter username and password.");
      return;
    }

    setLoading(true);
    console.log("API URL:", API_URL);
    console.log("Login Payload:", { username, password });

    try {
      const response = await axios.post(
        `${API_URL}/login`,
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      const userToken = response.data.token;
      setToken(userToken); // Store token globally
      setUser(response.data.user); // Store user globally
      console.log("Login successful", response.data);
      navigation.navigate("Open Call Admin copy");
    } catch (error) {
      if (error.response) {
        console.error("Server Error:", error.response.status, error.response.data);
        alert(`Login failed: ${error.response.data.message || "Invalid credentials"}`);
      } else if (error.request) {
        console.error("No response from server:", error.request);
        alert("Server not responding. Check your internet or API URL.");
      } else {
        console.error("Axios Error:", error.message);
        alert("Something went wrong. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-black">
      {/* Background Image */}
      <Animated.Image source={{ uri: "background.png" }} className="absolute w-full h-full" style={backgroundStyle} />
      {/* Light Effect */}
      <Animated.Image source={{ uri: "light.png" }} className="absolute top-10 w-40 h-72" style={lightStyle} />

      {/* Login Form */}
      <Animated.View className="w-4/5 p-5 bg-white/90 rounded-2xl shadow-lg items-center" style={formStyle}>
        <Text className="text-3xl font-bold text-black mb-5">Admin Login</Text>

        {/* username Input */}
        <TextInput
          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-black mb-4"
          placeholder="Username"
          placeholderTextColor="#777"
          keyboardType="username-address"
          autoCapitalize="none"
          value={username}
          onChangeText={setUsername}
        />

        {/* Password Input */}
        <TextInput
          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-black"
          placeholder="Password"
          secureTextEntry
          placeholderTextColor="#777"
          autoCapitalize="none"
          value={password}
          onChangeText={setPassword}
        />

        {/* Login Button */}
        <AnimatedTouchableOpacity
          className={`mt-4 w-full ${loading ? "bg-gray-400" : "bg-blue-500"} py-3 rounded-lg items-center`}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text className="text-white text-lg font-bold">{loading ? "Logging in..." : "Login"}</Text>
        </AnimatedTouchableOpacity>

      </Animated.View>
    </View>
  );
};

export default LoginScreen;
