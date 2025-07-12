import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars";
import moment from "moment";
import axios from "axios";
import env from "./utils/env";
import { useNavigation } from '@react-navigation/native';

const GeneralCalendar = () => {
    const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState("");
  const [events, setEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]); // Stores all events from API
  const [markedDates, setMarkedDates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = env.API_BASE_URL;

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${API_URL}/events`);
      const eventData = response.data;
      setAllEvents(eventData);

      // Process events into marked dates
      let formattedMarkedDates = {};
      eventData.forEach((event) => {
        const date = event.dateTime.split("T")[0]; // Extract YYYY-MM-DD format
        if (!formattedMarkedDates[date]) {
          formattedMarkedDates[date] = { marked: true, dots: [{ key: "event", color: "#6C63FF" }] };
        }
      });

      setMarkedDates(formattedMarkedDates);
    } catch (err) {
      setError("Failed to load events");
    } finally {
      setLoading(false);
    }
  };


  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  
    // Create a new markedDates object that resets previous selection
    const updatedMarkedDates = Object.keys(markedDates).reduce((acc, date) => {
      acc[date] = { ...markedDates[date] }; // Preserve existing dots
      delete acc[date].selected; // Remove selection highlight from all
      return acc;
    }, {});
  
    // Add selection highlight ONLY to the new date
    updatedMarkedDates[day.dateString] = {
      ...updatedMarkedDates[day.dateString], // Preserve dots if already marked
      selected: true,
      selectedColor: "#6C63FF", // Background color for selected date
    };
  
    setMarkedDates(updatedMarkedDates);
  
    // Filter events for the selected date
    const filteredEvents = allEvents.filter((event) =>
      event.dateTime.startsWith(day.dateString)
    );
    setEvents(filteredEvents);
  };
  



  const renderEvent = ({ item }) => (
  
    <TouchableOpacity className="bg-indigo-100 p-4 mb-4 rounded-xl shadow-sm border-l-4 border-indigo-600" key={item.id} onPress={() => navigation.navigate('EventDetailsScreen', { eventId: item.id })}>
      <Text className="text-lg font-semibold text-gray-900 uppercase">{item.title}</Text>
      <Text className="text-lg font-medium text-gray-600 lowercase">{item.subtitle}</Text>

      <Text className="text-indigo-700 mt-1 font-medium">{moment(item.dateTime).format("hh:mm A")}</Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-white px-6 py-10">
      <Text className="text-3xl font-extrabold text-center text-gray-900 mb-6">
        Events Calendar
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color="#6C63FF" />
      ) : error ? (
        <Text className="text-center text-red-500">{error}</Text>
      ) : (
        <Calendar
          onDayPress={handleDayPress}
          markedDates={markedDates}
          markingType="multi-dot"
          theme={{
            todayTextColor: "#6C63FF",
            arrowColor: "#6C63FF",
            selectedDayBackgroundColor: "#6C63FF",
            selectedDayTextColor: "#FFFFFF",
            textDayFontSize: 16,
            textMonthFontSize: 18,
            textDayHeaderFontSize: 14,
          }}
        />
      )}

      <Text className="mt-6 text-center text-gray-700 text-lg font-medium">
        {selectedDate ? `Events on ${selectedDate}` : "Select a date to see events"}
      </Text>

      {events.length > 0 ? (
        <FlatList
          data={events}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderEvent}
          className="mt-4"
        />
      ) : (
        selectedDate && !loading && (
          <View className="mt-4 bg-gray-100 py-4 px-4 rounded-xl shadow-sm">
            <Text className="text-center text-gray-500 text-lg">No events for this day</Text>
          </View>
        )
      )}
    </View>
  );
};

export default GeneralCalendar;
