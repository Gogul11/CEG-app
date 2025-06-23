import { useEffect, useState } from "react";
import { Text, ScrollView, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withRepeat, 
  withSequence 
} from "react-native-reanimated";

const AnimatedCard = () => {
  const rotation = useSharedValue(0);
  const texts = ["General College App", "Lost and Found", "Campus Map"];
  const urls = ["/", "/addItem", "/campusMap"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      rotation.value = withSequence(
        withTiming(270, { duration: 500 }),  
        withTiming(360, { duration: 500 })  
      );

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % texts.length);
      }, 500); 
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotateY: `${rotation.value}deg` }],
  }));

  return (
    <ScrollView className="flex-1" contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}>
      <Animated.View className="w-[200px] h-[150px] bg-[#A7E0FC] flex justify-center items-center rounded-[20px]" style={animatedStyle}>
        <TouchableOpacity className="flex-1 justify-center" onPress={() => router.push(urls[index])}>
          <Text className="text-[20px] font-bold text-black">{texts[index]}</Text>
        </TouchableOpacity>
      </Animated.View>
    </ScrollView>
  );
};

export default AnimatedCard;
