import * as React from "react";
import { View } from "react-native";

const Rectangle = ({ children }: { children: React.ReactNode }) => {
  return (
    <View className="rounded-[22px] bg-[#f6e5e5] border-[7px] border-solid border-[#4040a6] flex-1 w-full h-[252px]">
      {children}
    </View>
  );
};

export default Rectangle;

