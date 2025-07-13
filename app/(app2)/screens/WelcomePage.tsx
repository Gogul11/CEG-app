import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeIn } from "react-native-reanimated";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Menu, Divider, Provider } from "react-native-paper";

const WelcomePage: React.FC = () => {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  return (
    <Provider>
      <LinearGradient colors={["#4A90E2", "#9013FE"]} className="flex-1 justify-center items-center px-6">
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
            <Menu.Item onPress={() => navigation.navigate("about" as never)} title="About us" />
            <Divider />
            <Menu.Item onPress={() => navigation.navigate("LoginScreen" as never)} title="Admin Login" />
          </Menu>
        </View>
        <Animated.View entering={FadeIn.duration(1000)} className="items-center">
          <Text className="text-4xl font-bold text-white mb-4">WELCOME</Text>
          <Image source={require("./assets/images/illustration.png")} className="w-52 h-52 mb-6" />
          <Text className="text-lg text-gray-200 text-center mb-8 px-6">
            What would you like to explore today?
          </Text>
          <TouchableOpacity
            className="flex-row items-center bg-yellow-400 rounded-full py-3 px-6 w-2.5/5 justify-center shadow-lg mb-4"
            onPress={() => navigation.navigate("EventListScreen" as never)}
          >
            <Icon name="event" size={24} color="black" className="mr-3" />
            <Text className="text-lg font-bold text-black">Explore Events</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row items-center border-2 border-yellow-400 rounded-full py-3 px-6 w-2.5/5 justify-center shadow-lg"
            onPress={() => navigation.navigate("Club" as never)}
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
