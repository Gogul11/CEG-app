import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeIn } from "react-native-reanimated";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Menu, Divider, Provider } from "react-native-paper"; // Importing Menu for dropdown

const WelcomePage = () => {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);

  // Toggle menu visibility
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  return (
    <Provider>
      <LinearGradient colors={["#4A90E2", "#9013FE"]} className="flex-1 justify-center items-center px-6">
        
        {/* Top Right 3-Dot Menu */}
        <View className="absolute top-12 right-6">
          <Menu
            visible={menuVisible}
            onDismiss={closeMenu}
            anchor={
              <TouchableOpacity onPress={openMenu}>
                <Icon name="more-vert" size={28} color="white" />
              </TouchableOpacity>
            }
          >
            <Menu.Item onPress={() => navigation.navigate("about")} title="About us" />
            <Divider />
            <Menu.Item onPress={() => navigation.navigate("LoginScreen")} title="Admin Login" />
          </Menu>
        </View>

        <Animated.View entering={FadeIn.duration(1000)} className="items-center">
          {/* Title */}
          <Text className="text-4xl font-bold text-white mb-4">WELCOME</Text>

          {/* Illustration */}
          <Image source={require("./assets/images/illustration.png")} className="w-52 h-52 mb-6" />

          {/* Subtitle */}
          <Text className="text-lg text-gray-200 text-center mb-8 px-6">
            What would you like to explore today?
          </Text>

          {/* Explore Events Button */}
          <TouchableOpacity
            className="flex-row items-center bg-yellow-400 rounded-full py-3 px-6 w-2.5/5 justify-center shadow-lg mb-4"
            onPress={() => navigation.navigate("EventListScreen")}
          >
            <Icon name="event" size={24} color="black" className="mr-3" />
            <Text className="text-lg font-bold text-black">Explore Events</Text>
          </TouchableOpacity>

          {/* Discover Clubs Button */}
          <TouchableOpacity
            className="flex-row items-center border-2 border-yellow-400 rounded-full py-3 px-6 w-2.5/5 justify-center shadow-lg"
            onPress={() => navigation.navigate("Club")}
          >
            <Icon name="group" size={24} color="white" className="mr-3" />
            <Text className="text-lg font-bold text-white">Discover Clubs</Text>
          </TouchableOpacity>
        </Animated.View>
      </LinearGradient>
    </Provider>
  );
};

export default WelcomePage;
