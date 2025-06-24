import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const About = () => {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center bg-gray-100 px-6">
      <Text className="text-3xl font-bold text-gray-800 mb-4">About Events Club</Text>
      <Text className="text-lg text-gray-600 text-center mb-6">
        Events Club is an app to manage and view events happening in your college.{"\n"}
        Created with ❤️ using React Native.
      </Text>

    </View>
  );
};

export default About;
