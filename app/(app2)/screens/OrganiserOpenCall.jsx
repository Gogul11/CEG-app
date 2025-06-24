import * as React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const OrganiserOpenCall = () => {
  return (
    <LinearGradient
      colors={["#4158D0", "#C850C0", "#FFCC70"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.popUpContainer}>
        <View style={styles.headerGradient}>
          <LinearGradient
            colors={["#6a13db", "#9013FE"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientBanner}
          >
            <Text style={styles.dateText}>17 Jan</Text>
            <Text style={styles.categoryText}>TECH</Text>
            <Text style={styles.eventText}>CTF</Text>
          </LinearGradient>
        </View>

        <Image style={styles.image} source={require("../assets/images/ctf.png")} />
        
        <View style={styles.organiserWrapper}>
          <Text style={styles.organiserText}>Organiser open call</Text>
        </View>

        <View style={styles.messageWrapper}>
          <Text style={styles.messageText}>
            Hi everyone! Greetings from CEG Tech Forum. We are glad to announce that we are looking forward to organisers for 2025-26. It is open to all third years.
            {"\n\n"}Venue: Sports Gallery
            {"\n"}Date: 21 Jan 2025
            {"\n"}Time: 05:00 pm
            {"\n\n"}Regards,
            {"\n"}HR SD, CTF
          </Text>
        </View>
      </View>
    </LinearGradient>
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
    backgroundColor: "#fff",
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    borderColor: "rgba(255,255,255,0.2)",
    borderWidth: 1,
    overflow: "hidden",
  },
  headerGradient: {
    width: "100%",
  },
  gradientBanner: {
    padding: 20,
    alignItems: "flex-end",
  },
  dateText: {
    fontSize: 16,
    fontFamily: "AkayaTelivigala-Regular",
    color: "rgba(255, 255, 255, 0.9)",
    marginTop: 10,
  },
  categoryText: {
    fontSize: 16,
    fontFamily: "AkayaTelivigala-Regular",
    color: "rgba(255, 255, 255, 0.9)",
  },
  eventText: {
    fontSize: 16,
    fontFamily: "AkayaTelivigala-Regular",
    color: "rgba(255, 255, 255, 0.9)",
    marginBottom: 10,
  },
  image: {
    width: 63,
    height: 63,
    alignSelf: "center",
    marginTop: -30,
    borderRadius: 31.5,
    borderWidth: 3,
    borderColor: "#fff",
  },
  organiserWrapper: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  organiserText: {
    fontSize: 20,
    fontFamily: "AlikeAngular-Regular",
    color: "#6a13db",
    textAlign: "center",
  },
  messageWrapper: {
    margin: 15,
    padding: 15,
    borderRadius: 15,
    backgroundColor: "#f8f9fa",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  messageText: {
    color: "#2d3436",
    fontSize: 16,
    fontFamily: "AkayaTelivigala-Regular",
    textAlign: "left",
    lineHeight: 24,
  },
});

export default OrganiserOpenCall ;