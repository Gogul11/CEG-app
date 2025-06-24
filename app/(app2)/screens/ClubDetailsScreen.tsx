import React from "react";
import { View, Text, Image, TouchableOpacity, Linking } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from "react-native-reanimated";

const ClubDetailsScreen = ({ route }: any) => {
  const { club } = route.params;

  // Bounce Animation for the Image (Up & Down)
  const translateY = useSharedValue(0);
  translateY.value = withRepeat(
    withTiming(-10, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
    -1,
    true
  );

  const animatedImageStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const handleVisitWebsite = () => {
    Linking.openURL(club.website);
  };

  const handleVisitInsta = () => {
    Linking.openURL(club.insta);
  };

  // Function to open Gmail with pre-filled "To" field
  const handleSendEmail = () => {
    const email = club.email; // Club's email
    const subject = encodeURIComponent("Inquiry about " + club.name);
    const body = encodeURIComponent("Hello, I would like to know more about " + club.name);

    const gmailURL = `mailto:${email}?subject=${subject}&body=${body}`;
    Linking.openURL(gmailURL);
  };

  return (
    <LinearGradient colors={["#4A90E2", "#9013FE"]} className="flex-1 items-center justify-center px-6">
      {/* Animated Club Logo */}
      <Animated.View className="bg-white/20 rounded-2xl p-4 shadow-lg mb-6" style={animatedImageStyle}>
        <Image source={club.image} className="w-40 h-40 rounded-xl" />
      </Animated.View>

      {/* Club Details */}
      <Text className="text-3xl font-extrabold text-white mb-2">{club.name}</Text>
      <Text className="text-lg text-gray-200 text-center px-4">{club.description}</Text>

      {/* Visit Website Button */}
      <TouchableOpacity
        className="border-2 bg-gray-100 rounded-xl py-3 px-6 mt-4 w-3/5 items-center active:scale-95 transition-transform"
        onPress={handleVisitWebsite}
      >
        <Text className="text-gray-800 font-bold text-lg">Visit Website</Text>
      </TouchableOpacity>

      {/* 📩 Gmail Button */}
      <TouchableOpacity
        className="border-2 bg-gray-100 rounded-xl py-3 px-6 mt-4 w-3/5 items-center active:scale-95 transition-transform"
        onPress={handleSendEmail}
      >
        <Text className="text-gray font-bold text-lg">Contact via Gmail</Text>
      </TouchableOpacity>

      {/* Instagram Button */}
      <TouchableOpacity
        className="border-2 bg-gray-100 rounded-xl py-3 px-6 mt-4 w-3/5 items-center active:scale-95 transition-transform"
        onPress={handleVisitInsta}
      >
        <Text className="text-gray font-bold text-lg">Visit Instagram</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default ClubDetailsScreen;

