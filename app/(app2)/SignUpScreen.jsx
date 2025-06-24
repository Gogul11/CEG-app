import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import {navigation} from "@react-navigation/native";  
import axios from "axios";
import env from "./utils/env";

export default function SignUpScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const API_URL = env.API_BASE_URL;
  navigation = useNavigation();
  const handleSignUp = async () => {
    try {
      const response = await axios.post(`${API_URL}/register`, {
        username,
        password,
      });
      if (response.status === 201) {
        alert("Sign up successful!");
        navigation.navigate('LoginScreen');
      } else {
        alert("Sign up failed!");
      }
    } catch (error) {
      alert("An error occurred. Please try again."+error);
    }
  };

  return (
    <View className="flex-1 bg-primary justify-center items-center">
      <Text className="text-2xl font-bold text-white">Sign Up</Text>
      <TextInput
        placeholder="Username"
        className="w-3/4 p-4 bg-white rounded-lg mt-4"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        className="w-3/4 p-4 bg-white rounded-lg mt-4"
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity
        className="w-3/4 p-4 bg-secondary rounded-lg mt-4"
        onPress={handleSignUp}
      >
        <Text className="text-center text-white font-semibold">Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}