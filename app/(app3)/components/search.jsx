import { View, Text } from "react-native";
import Svg, { Path, Circle } from "react-native-svg";
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  withRepeat
} from "react-native-reanimated";
import { useEffect } from "react";

const AnimatedView = Animated.createAnimatedComponent(View);

const SearchIcon = () => {
  const translateY = useSharedValue(-150); 
  const scale = useSharedValue(0.1); 
  const rotate =useSharedValue(0)

  useEffect(() => {
        translateY.value = withRepeat(withTiming(0, { duration: 3000 }), 1, false);
        scale.value = withTiming(1, { duration: 3000 }); // Scale up smoothly
        rotate.value = withTiming(315, {duration : 3000})
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }, { scale: scale.value }, {rotate : `${rotate.value}deg`}],
    rotate : rotate.value
  }));

  return (
    <View className="flex-1 flex-col justify-center items-center">
      <AnimatedView style={animatedStyle}>
        <Svg width={150} height={150} viewBox="0 0 24 24" fill="none">
          <Circle cx="11" cy="11" r="7" stroke="#38bdf8" strokeWidth="2" />
          <Path d="M18 18 L25 25" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
        </Svg>
      </AnimatedView>
      <Text className="text-center text-[25px] m-[30px] font-psemibold">Explore the Lost Items</Text>
    </View>
  );
};


export default SearchIcon;
