

import * as React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

const Frame = () => {
  return (
    <View style={styles.container}>
      <View style={styles.popUpContainer}>
        <Text style={[styles.dateText, styles.textStyle]}>17 Jan</Text>
        <Text style={[styles.categoryText, styles.textStyle]}>TECH</Text>
        <Text style={[styles.eventText, styles.textStyle]}>CTF</Text>

        <Image style={styles.image} source={require("../assets/images/Ellipse1.png")} />
        
        <Text style={styles.reviewTitle}>Tech Team Review</Text>

        <View style={styles.messageWrapper}>
          <Text style={styles.messageText}>
            Hi everyone! Greetings from CEG Tech Forum. We hereby inform that a review meet will be held for the technical team. All are requested to attend the meeting with updates on their work.
            Venue: J Block
            Date: 20 Jan 2025
            Time: 05:00 pm
            Regards,
            HR SD, CTF
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  popUpContainer: {
    width: "100%",
    maxWidth: 400,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    borderColor: "#ddd",
    borderWidth: 1,
    position: "relative",
  },
  textStyle: {
    fontFamily: "AkayaTelivigala-Regular",
    fontSize: 16,
    color: "rgba(106, 19, 219, 0.5)",
  },
  dateText: {
    position: "absolute",
    top: 30,
    right: 20,
  },
  categoryText: {
    position: "absolute",
    top: 70,
    right: 20,
  },
  eventText: {
    position: "absolute",
    top: 50,
    right: 20,
  },
  image: {
    width: 63,
    height: 63,
    alignSelf: "center",
    marginTop: 20,
  },
  reviewTitle: {
    fontSize: 24,
    fontFamily: "AlikeAngular-Regular",
    color: "#6a13db",
    textAlign: "center",
    marginTop: 20,
  },
  messageWrapper: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#f7f7f7",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  messageText: {
    color: "#000",
    fontSize: 16,
    fontFamily: "AkayaTelivigala-Regular",
    textAlign: "left",
  },
});

export default Frame;


// import * as React from "react";
// import {StyleSheet, View, Text, Image} from "react-native";

// const Frame = () => {
  	
//   	return (
//     		<View style={styles.popUpMessage1Parent}>
//       			<View style={styles.popPosition}>
//         				<View style={[styles.popUpMessage1Child, styles.popPosition]} />
//         				<Text style={[styles.jan, styles.janTypo]}>17 Jan</Text>
//         				<Text style={[styles.tech, styles.janTypo]}>TECH</Text>
//         				<Text style={[styles.ctf, styles.janTypo]}>CTF</Text>
//                         <Image style={[styles.box1Item, { width: 63, height: 63 }]} source={require("../../assets/images/Ellipse1.png")} />
//         				<Text style={styles.techTeamReview}>Tech Team Review</Text>
//         				<View style={[styles.hiEveryoneGreetingsFromCeWrapper, styles.popUpMessage1ItemLayout]}>
//           					<Text style={styles.hiEveryoneGreetings}>{`Hi everyone!
// Greetings from CEG Tech Forum. We hereby inform that a review meet will be held for techical team. All are insisted to attend the meeet with the updates on their work.
// Venue: J Block
// Date  : 20 Jan 2025
// Time  : 05:00 pm
// Regards,
// HR SD,
//           					CTF`}</Text>
//       			</View>
//     		</View>
//   	</View>);
// };

// const styles = StyleSheet.create({
// popPosition: {
//   	width: 364,
//   	left: 0,
//   	top: 0,
//   	position: "absolute",
//   	height: 463
// },
// janTypo: {
//   	color: "rgba(106, 19, 219, 0.5)",
//   	textAlign: "left",
//   	fontFamily: "AkayaTelivigala-Regular",
//   	fontSize: 16,
//   	position: "absolute"
// },
// popUpMessage1ItemLayout: {
//   	borderRadius: 25,
//   	position: "absolute"
// },
// popUpMessage1Child: {
//   	shadowColor: "rgba(0, 0, 0, 0.25)",
//   	shadowOffset: {
//     		width: 0,
//     		height: 4
//   	},
//   	shadowRadius: 4,
//   	elevation: 4,
//   	shadowOpacity: 1,
//   	backgroundColor: "#fff",
//   	width: 364,
//   	left: 0,
//   	top: 0,
//   	borderRadius: 25
// },
// jan: {
//   	top: 30,
//   	left: 300,
//   	textAlign: "left"
// },
// tech: {
//   	top: 97,
//   	left: 308,
//   	textAlign: "left"
// },
// ctf: {
//   	top: 78,
//   	left: 318,
//   	textAlign: "left"
// },
// popUpMessage1Item: {
//   	top: 23,
//   	left: 21,
//   	position: "absolute"
// },
// techTeamReview: {
//   	top: 49,
//   	left: 144,
//   	fontSize: 24,
//   	fontFamily: "AlikeAngular-Regular",
//   	color: "#6a13db",
//   	width: 208,
//   	height: 29,
//   	textAlign: "left",
//   	position: "absolute"
// },
// hiEveryoneGreetings: {
//   	color: "#000",
//   	width: 305,
//   	textAlign: "left",
//   	fontFamily: "AkayaTelivigala-Regular",
//   	fontSize: 16
// },
// hiEveryoneGreetingsFromCeWrapper: {
//   	top: 165,
//   	left: 26,
//   	flexDirection: "row",
//   	alignItems: "center",
//   	justifyContent: "center",
//   	padding: 10,
//   	position: "absolute"
// },
// popUpMessage1Parent: {
//   	borderStyle: "solid",
//   	borderColor: "#000",
//   	borderWidth: 2,
//   	flex: 1,
//   	width: "100%",
//   	overflow: "hidden",
//   	height: 463,
//   	backgroundColor: "#fff",
//   	borderRadius: 25
// }
// });

// export default Frame;