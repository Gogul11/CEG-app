import React from "react";
import { View, Text, TouchableOpacity,Image } from "react-native";
import { useRouter } from "expo-router";

const SplashScreen = () => {
    const router = useRouter();
  
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
  
        {/* <Image
                source={require("../assets/images/ctf_logo.png")}
                style={{ width: 200, height: 400 }}
              /> */}
  
        <Text className="text-3xl font-bold mb-2 text-gray-800">HEY THERE!</Text>
        <Text className="text-lg mb-6 text-gray-600">Welcome to Clubs and Events</Text>
  
        <TouchableOpacity 
          className="bg-indigo-700 rounded-2xl py-3 px-8 my-2 w-3/4 items-center shadow-md active:scale-95"
          onPress={() => router.push("/WelcomePage")}
        >
          <Text className="text-white text-lg font-semibold">Get Started</Text>
        </TouchableOpacity>
  
        <TouchableOpacity 
          className="bg-indigo-500 rounded-2xl py-3 px-8 my-2 w-3/4 items-center shadow-md active:scale-95"
          onPress={() => router.push("/LoginScreen")}
        >
          <Text className="text-white text-lg font-semibold">Login</Text>
        </TouchableOpacity>
  
        <TouchableOpacity 
          className="bg-indigo-400 rounded-2xl py-3 px-8 my-2 w-3/4 items-center shadow-md active:scale-95"
          onPress={() => router.push("/about")}
        >
          <Text className="text-white text-lg font-semibold">About Us</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  export default SplashScreen;
  