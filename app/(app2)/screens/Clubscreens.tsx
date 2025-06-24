import React, { useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withSequence, withTiming } from "react-native-reanimated";

// Define types
type RootStackParamList = {
  Announcement: undefined;
  AboutClubs: undefined;
};

type ClubScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface ClubScreenProps {
  navigation: ClubScreenNavigationProp;
}

interface ClubItem {
  id: string;
  name: string;
  image: any;
  route: keyof RootStackParamList;
}

const temp: ClubItem[] = [
  { 
    id: "1", 
    name: "Announcement", 
    image: require("../assets/images/Undraw_Happy-Announcement_23nf.png"), 
    route: "Announcements" 
  },
  { 
    id: "2", 
    name: "About Clubs", 
    image: require("../assets/images/Undraw_Partying_3qad.png"), 
    route: "About Clubs" 
  },
];

const ClubScreen: React.FC<ClubScreenProps> = ({ navigation }) => {
  // Create animated values for image rotation and button scale/opacity
  const rotateAnim = useSharedValue(0);
  const scaleAnim = useSharedValue(1);
  const opacityAnim = useSharedValue(1);

  useEffect(() => {
    rotateAnim.value = withRepeat(withTiming(1, { duration: 2000 }), -1, true);
    scaleAnim.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 1000 }),
        withTiming(1, { duration: 1000 })
      ),
      -1
    );
    opacityAnim.value = withRepeat(
      withSequence(
        withTiming(0.9, { duration: 500 }),
        withTiming(1, { duration: 500 })
      ),
      -1
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ rotate: `${rotateAnim.value * 20 - 10}deg` }] }));
  const buttonStyle = useAnimatedStyle(() => ({ transform: [{ scale: scaleAnim.value }], opacity: opacityAnim.value }));

  return (
    <LinearGradient colors={["#4A90E2", "#9013FE"]} className="flex-1 p-6">
      <Text className="text-white text-3xl mt-10 font-extrabold text-center uppercase tracking-widest ">
        Welcome to the Club Section
      </Text>

      <View className="flex-1 justify-center">
        {temp.map((item) => (
          <TouchableOpacity
            key={item.id}
            className="bg-white/20 rounded-2xl p-14 items-center mx-8 mb-10 shadow-lg shadow-black/20"
            onPress={() => item.route && navigation.navigate(item.route)}
            activeOpacity={0.8}
          >
            <Animated.View className="items-center justify-center" style={buttonStyle}>
              <Animated.Image 
                source={item.image} 
                className="w-32 h-28 rounded-lg mb-3"
                resizeMode="contain"
                style={animatedStyle}
              />
            </Animated.View>
            <Text className="text-white text-xl font-bold">{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </LinearGradient>
  );
};

export default ClubScreen;
