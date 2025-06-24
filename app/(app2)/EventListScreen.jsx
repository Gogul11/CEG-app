import React, { useState, useEffect } from "react";
import { View, Text, Image, TextInput, TouchableOpacity,Linking, ScrollView, ActivityIndicator } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import moment from "moment";
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import env from "./utils/env";


const EventListScreen = () => {
  const navigation = useNavigation();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const API_URL = env.API_BASE_URL ;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${API_URL}/events_with_creators`,);
        setEvents(response.data);
      } catch (err) {
        setError("Failed to load events");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

    // const filteredEvents = events.filter(
  //   (event) =>
  //     event.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     event.dateTime.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     event.month.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     event.club.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     event.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     event.location.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  return (
    <View className="flex-1 bg-white px-7 pt-10 pb-5">
      {/* Header */}
      <View className="mb-5 flex-row items-center justify-between px-4">
        <View className="flex-1 items-center">
          <Text className="text-3xl font-extrabold text-gray-900 text-center">
            CEG Events
          </Text>
          <Text className="text-gray-500 text-center mt-1">
            {moment().format("DD MMM YYYY | dddd")}
          </Text>
        </View>
        <TouchableOpacity 
          className="bg-gray-800 rounded-full p-3 shadow-lg active:scale-90"
          onPress={() => navigation.navigate('GeneralCalender')}
        >
          <FontAwesome name="calendar" size={18} color="white" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View className="bg-gray-200 rounded-2xl p-1 flex-row items-center mb-5 ">
        <FontAwesome name="search" size={18} className={`text-white ml-2 p-2 px-3 rounded-lg`} />
        <TextInput 
          placeholder="Search events ..."  
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)} 
          className="text-black flex-1 " 
        />
      </View>

      {/* Events List */}
      {loading ? (
        <ActivityIndicator size="large" color="#000" className="mt-5" />
      ) : error ? (
          <Text className="text-center text-red-500">{error}. Try again later</Text>
      ) : (
        <ScrollView className="space-y-5">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <TouchableOpacity 
              key={event.id} 
               onPress={() => navigation.navigate("EventDetailsScreen", { eventId: event.id })}>
                <View key={event.id} className="bg-gray-200 rounded-2xl p-3 shadow-md mb-5">
                  <Image source={{ uri: event.poster }} className="w-full h-40 rounded-2xl" />
                  <View className="absolute top-5 left-5 bg-white rounded-xl px-2.5 text-center">
                    <Text className="text-xl font-bold text-black-600">{moment(event.dateTime).format("DD")}</Text>
                    <Text className="text-sm uppercase font-semibold text-gray-800">{moment(event.dateTime).format("MMM")}</Text>
                  </View>
                  <View className="bg-white p-4 -mt-12 mx-3 rounded-2xl shadow-lg">
                  <Text className="text-lg font-bold text-gray-900 uppercase">{event.title}</Text>
                  <Text className="text-sm text-gray-600 mb-2">{event.subtitle} | {event.createdByUsername}</Text>  
                  
                  <View className="flex-row items-center">
                      <FontAwesome name="map-marker" size={18} className={`text-white p-2 px-3 rounded-lg bg-indigo-400`} onPress={() => Linking.openURL(event.locationLink)}/>
                      <Text className="text-xs text-gray-500 ml-3">{moment(event.dateTime).format("hh:mm A")} | {event.location}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text className="text-center text-gray-500 mt-5">No events found</Text>
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default EventListScreen;
