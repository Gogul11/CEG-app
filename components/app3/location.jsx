import { View, Text } from "react-native";
import Svg, { Path } from "react-native-svg";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withRepeat } from "react-native-reanimated";
import { useEffect } from "react";

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const LocationIcon = ({ size = 150 }) => {
  const rotateY = useSharedValue(0); 
  const opacity = useSharedValue(0); 

  useEffect(() => {
    rotateY.value = withRepeat(withTiming(360, { duration: 3000 }), 1, false);
    
    
    opacity.value = withRepeat(withTiming(1, { duration: 3000 }), 1, true);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotateY: `${rotateY.value}deg` }],
  }));

  return (
    <View className='flex-1 flex-col justify-center items-center gap-[30px]'>
      <AnimatedSvg width={size} height={size} viewBox="0 0 24 24" fill="none" style={animatedStyle}>
        <AnimatedPath
          d="M12 22C12 22 19 14.49 19 9C19 5.134 15.866 2 12 2C8.134 2 5 5.134 5 9C5 14.49 12 22 12 22Z"
          stroke="#38bdf8"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={opacity}
        />
        <AnimatedPath
          d="M12 11.5C13.3807 11.5 14.5 10.3807 14.5 9C14.5 7.61929 13.3807 6.5 12 6.5C10.6193 6.5 9.5 7.61929 9.5 9C9.5 10.3807 10.6193 11.5 12 11.5Z"
          stroke="#38bdf8"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={opacity}
        />
      </AnimatedSvg>

      <Text className='text-center text-quaternary text-[25px] font-psemibold'>
        Explore CEG's Beauty 
      </Text>
    </View>
  );
};

export default LocationIcon;
