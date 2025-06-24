import React, { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator, Alert, ScrollView, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Linking } from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // Import icons
import env from "./utils/env";

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
        {/* Event Poster */}
        <Image 
          source={{ uri: event.poster }} 
          className="w-full h-80 rounded-xl mb-6 shadow-lg"
          resizeMode="contain"
        />

        {/* Event Title & Subtitle */}
        <Text className="text-3xl font-extrabold text-gray-900">{event.title}</Text>
        <Text className="text-lg text-indigo-600 font-medium mt-1">{event.subtitle || "Subtitle"}</Text>

        {/* Event Description */}
        <Text className="text-md text-gray-700 mt-4 leading-relaxed">
          {event.description || "No description available."}
        </Text>

        {/* Organizer Info */}
        <View className="mt-5 bg-gray-100 p-4 rounded-lg flex-row items-center">
          <Icon name="person-circle-outline" size={24} color="#4F46E5" className="mr-2" />
          <Text className="text-md font-semibold text-gray-800">
            Organized by: {event.createdByUsername || "Unknown"}
          </Text>
        </View>

        {/* Action Buttons */}
        <View className="flex flex-row justify-center items-center pt-4 pb-4 border-t mt-6 border-gray-200">
          {event.locationLink && (
            <TouchableOpacity
              className="bg-blue-500 flex flex-row items-center py-2 px-4 rounded-lg mr-2"
              onPress={() => Linking.openURL(event.locationLink)}
            >
              <Icon name="location-outline" size={20} color="white" className="mr-1" />
              <Text className="text-white text-lg font-semibold">Location</Text>
            </TouchableOpacity>
          )}
          {event.gformLink && (
            <TouchableOpacity
              className="bg-indigo-600 flex flex-row items-center py-2 px-4 rounded-lg mr-2"
              onPress={() => Linking.openURL(event.gformLink)}
            >
              <Icon name="clipboard-outline" size={20} color="white" className="mr-1" />
              <Text className="text-white text-lg font-semibold">Register</Text>
            </TouchableOpacity>
          )}
          {event.instaLink && (
            <TouchableOpacity
              className="bg-pink-500 flex flex-row items-center py-2 px-4 rounded-lg"
              onPress={() => Linking.openURL(event.instaLink)}
            >
              <Icon name="logo-instagram" size={20} color="white" className="mr-1" />
              <Text className="text-white text-lg font-semibold">Instagram</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default EventDetailScreen;
