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


// import * as React from "react";
// import {StyleSheet, View} from "react-native";
// const Rectangle = ({ children }: { children: React.ReactNode }) => {
//     return (
//         <View style={styles.rectangleView} />);
// };
// const styles = StyleSheet.create({
//     rectangleView: {
//         borderRadius: 22,
//         backgroundColor: "#f6e5e5",
//         borderStyle: "solid",
//         borderColor: "#4040a6",
//         borderWidth: 7,
//         flex: 1,
//         width: "100%",
//         height: 252
//     }
// });
// export default Rectangle;