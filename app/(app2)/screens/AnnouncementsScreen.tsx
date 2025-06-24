import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const announcementsData = [
  { id: "1", title: "Volunteer Open Call", route: "" },
  { id: "2", title: "Organisers Open Call", route: "OrganiserOpenCall" },
  { id: "3", title: "Technical Team Review", route: "" },
  { id: "4", title: "Tech Event Updates", route: "" },
  { id: "5", title: "New Club Initiatives", route: "" },
  { id: "6", title: "Upcoming Competitions", route: "" },
  { id: "7", title: "General Announcements", route: "" },
];

const AnnouncementsScreen = ({ navigation }: any) => {
  return (
    <LinearGradient
      colors={["#4158D0", "#C850C0", "#FFCC70"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {/* Gradient Header */}
      <LinearGradient 
        colors={["#6a13db", "#9013FE"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <Text style={styles.headerText}>
          Announcements
        </Text>
      </LinearGradient>

      {/* Announcement List */}
      <FlatList
        data={announcementsData}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => item.route && navigation.navigate(item.route)}
          >
            <LinearGradient
              colors={["rgba(255,255,255,0.9)", "rgba(255,255,255,0.8)"]}
              style={styles.card}
            >
              {/* Icon */}
              <LinearGradient
                colors={["#EEF2FF", "#F5F3FF"]}
                style={styles.iconContainer}
              >
                <Icon name="bullhorn-outline" size={28} color="#6A13DB" />
              </LinearGradient>

              {/* Announcement Details */}
              <View>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subtitle}>CTF • 17 Jan • TECH</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        )}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 24,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerText: {
    fontSize: 28,
    fontWeight: '800',
    color: 'white',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  listContainer: {
    paddingTop: 12,
    paddingBottom: 20,
  },
  card: {
    marginHorizontal: 20,
    marginVertical: 12,
    padding: 20,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#3730A3',
    textShadowColor: 'rgba(0, 0, 0, 0.05)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
});

export default AnnouncementsScreen;



/*
import React, { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator,  Alert, ScrollView, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Linking } from "react-native";
import env from "../env";

const EventDetailScreen = () => {
  const route = useRoute();
  const { eventId } = route.params;
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_URL = env.API_BASE_URL;

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`${API_URL}/events/${eventId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch event details");
        }
        const data = await response.json();
        setEvent(data);
      } catch (error) {
        console.error("Error fetching event details:", error);
        Alert.alert("Error", "Could not fetch event details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#4F46E5" />
      </View>
    );
  }

  if (!event) {
    return (
      <View className="flex-1 justify-center items-center bg-white px-6">
        <Text className="text-xl font-semibold text-gray-800">Event Not Found</Text>
        <Text className="text-gray-600 mt-2 text-center">
          We couldn't find details for this event. Please check again later.
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6 pt-10 mb-9">
        <Image 
          source={{ uri: event.poster }} 
          className="w-full h-80 rounded-xl mb-6" 
          resizeMode="contain"
        />
        <Text className="text-3xl font-extrabold text-gray-900">{event.title}</Text>
        <Text className="text-lg text-indigo-600 font-medium mt-1">{event.subtitle || "Subtitle"}</Text>
          <Text className="text-md text-gray-700 mt-4 leading-relaxed">{event.description || "Design the Future of Gaming with 3D Modelling \n🎮 Unleash your creativity with Anipix Dive into the world of game set design and master the art of 3D modelling! \n\nTransform your ideas into interactive, visually captivating environments that will take your games to the next level. 🌟🎨\n\n With Anipix, explore cutting-edge tools and techniques to bring your digital worlds to life. Ready to design, build, and play? ⚡🖥"}</Text>

      <View className="flex flex-row justify-center items-center pt-3 pb-3 border-t mt-4 border-gray-200 mb-9">
        {event.locationLink ? (
          <TouchableOpacity 
            className="bg-blue-500 py-2 w-1/3 rounded-lg"
            onPress={() => {
              Linking.openURL(event.locationLink);
            }}
          >
            <Text className="text-center text-white text-lg font-semibold">Location</Text>
          </TouchableOpacity>
        ) : null}
        {event.gformLink ? (
          <TouchableOpacity 
            className="bg-indigo-600 ml-2 py-2 rounded-lg w-1/3 flex justify-center items-center"
            onPress={() => {
              Linking.openURL(event.gformLink);
            }}
          >
            <Text className="text-center text-white text-lg font-semibold">Register Now</Text>
          </TouchableOpacity>
        ) : null}
        {event.instaLink ? (
          <TouchableOpacity 
            className="bg-pink-500 ml-2 py-2 w-1/3 rounded-lg"
            onPress={() => {
              Linking.openURL(event.instaLink);
            }}
          >
            <Text className="text-center text-white text-lg font-semibold">Insta</Text>
          </TouchableOpacity>
        ) : null}
      </View>
      </ScrollView>

    </View>
  );
};

export default EventDetailScreen;
*/