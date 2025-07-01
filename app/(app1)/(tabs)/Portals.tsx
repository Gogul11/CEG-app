import React from "react";
import { SafeAreaView, View, ScrollView, Image, Text, StyleSheet, TouchableOpacity, Linking } from "react-native";

const portalsData = [
  {
    title: "Main Portal",
    url: "https://www.annauniv.edu",
    image: require("../../../assets/app1/images/aulogo.png"),
  },
  {
    title: "AU SEMS",
    url: "https://acoe.annauniv.edu/sems",
    image: require("../../../assets/app1/images/aukdc_logo.png"),
  },
  {
    title: "Academic Connect",
    url: "https://www.auegov.ac.in/AcademicConnect",
    image: require("../../../assets/app1/images/sems_logo.png"),
  },
  {
    title: "FACULTY H-INDEX",
    url: "https://annauniv.irins.org",
    image: require("../../../assets/app1/images/h-index.png"),
  },
  {
    title: "VRL/JLAB",
    url: "http://vrl.annauniv.edu:8000",
    image: require("../../../assets/app1/images/jupyterlab.png"),
  },
];

const Portals = () => {
  const openLink = (url: string) => {
    Linking.openURL(url).catch((err) => console.error("Failed to open URL:", err));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.sectionTitle}>NAVIGATE THROUGH PORTALS</Text>

        {portalsData.map((portal, index) => (
          <TouchableOpacity key={index} style={styles.portalCard} onPress={() => openLink(portal.url)}>
            <Image source={portal.image} resizeMode="contain" style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.portalTitle}>{portal.title}</Text>
              <Text style={styles.portalUrl}>{portal.url}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4F8", // White background for the entire screen
  },
  scrollView: {
    paddingVertical: 20,
    paddingHorizontal: 16, // Add horizontal padding for better spacing
  },
  sectionTitle: {
    fontSize: 24, // Larger font size
    fontWeight: "bold",
    color: "#1E3A8A", // Dark blue for the title
    textAlign: "center",
    marginBottom: 25,
  },
  portalCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12, // Rounded corners
    padding: 20, // Increased padding for bigger rows
    marginBottom: 15, // Margin between cards
    elevation: 3, // Shadow effect for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    borderWidth: 1, // Subtle border
    borderColor: "#E0E7FF", // Light blue border
  },
  image: {
    width: 60, // Larger image size
    height: 60, // Larger image size
    marginRight: 20, // Increased margin
  },
  textContainer: {
    flex: 1,
  },
  portalTitle: {
    fontSize: 20, // Larger font size
    fontWeight: "bold",
    color: "#1E3A8A", // Dark blue for the title
    marginBottom: 5, // Spacing between title and URL
  },
  portalUrl: {
    fontSize: 16, // Larger font size
    color: "#555", // Gray for the URL
  },
});

export default Portals;