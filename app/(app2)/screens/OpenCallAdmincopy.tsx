import React, { useState, useEffect } from "react";
import { useAuth } from "../utils/AuthContext";
import env from "../utils/env";
import { useNavigation } from "@react-navigation/native";
import DatePickerModal from "./DatePickerModal";
import TimePickerModal from "./TimePickerModal";
import RNPickerSelect from "react-native-picker-select";

import {
  Image,
  View,
  TextInput,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

const API_URL = env.API_BASE_URL;

const getFormattedDate = (date: Date, format = "YYYY/MM/DD") => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based
  const year = date.getFullYear();
  return format === "YYYY/MM/DD" ? `${year}/${month}/${day}` : `${day}/${month}/${year}`;
};

interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  multiline?: boolean;
  numberOfLines?: number;
}

const OpenCallAdmincopy: React.FC = () => {
  const { token } = useAuth(); 
  const { user } = useAuth();
  const navigation = useNavigation();
  
  const [clubName, setClubName] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [venue, setVenue] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [registration, setRegistration] = useState("");
  const [locationLink, setLocationLink] = useState("");
  const [instaLink, setInstaLink] = useState("");
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(getFormattedDate(new Date(), "YYYY/MM/DD"));
  const [openTimePicker, setOpenTimePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!token) {
      console.error("No token available. User might be logged out.");
      return;
    }

    const eventData = {
      title: title,
      subtitle: subtitle,
      description: description,
      time: `${date} ${time}`, 
      poster: selectedImage || "", 
      gformLink: registration,
      location:venue,
      locationLink: locationLink,
      instaLink: instaLink,
      clubName: clubName,

    };

    try {
      const response = await axios.post(`${API_URL}/events`, eventData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("Event created:", response.data);
      setClubName("");
      setTitle("");
      setDescription("");
      setSubtitle("");
      setInstaLink("");
      setLocationLink("");
      setVenue("");
      setDate("");
      setOpenStartDatePicker(false);
      setTime("");
      setOpenTimePicker(false);
      setSelectedDate(getFormattedDate(new Date(), "YYYY/MM/DD"));
      setTime("");
      setRegistration("");
      setSelectedImage(null);


    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Failed to (axios) create event:", error.response?.data || error.message);
      } else {
        console.error("Failed to create event:", error);
      }
    }
  };

  const InputField: React.FC<InputFieldProps> = ({
    label,
    value,
    placeholder,
    onChangeText,
    multiline = false,
    numberOfLines = 1,
  }) => (
    <View className="mb-4">
      <Text className="text-sm font-semibold text-gray-700 mb-2">{label}</Text>
      <TextInput
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        multiline={multiline}
        numberOfLines={numberOfLines}
        className={`w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 
          ${multiline ? "min-h-[100px]" : ""} focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200`}
        placeholderTextColor="#9CA3AF"
      />
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
        <ScrollView className="flex-1">
          <View className="p-6">
            {/* Header */}
            <View className="mb-3 bg-white rounded-xl p-6 shadow-sm items-center">
              <Text className="text-3xl font-bold text-gray-900 ">{user ? user : "Guest"}</Text>
              <Text className="text-lg text-gray-600 ">Event Creation</Text>
            </View>

            {/* Form */}
            <View className="bg-white rounded-xl p-6 shadow-sm space-y-6 mb-9">
              {/* Title & Content */}
              <View className="pb-6 border-b border-gray-200">
                              <Text className="text-xl font-semibold text-gray-800 mb-4">
                                Event Details
                              </Text>
                              <Text className="text-sm font-semibold text-gray-700 mb-2">Title</Text>
                                <TextInput
                                  value={title}
                                  onChangeText={setTitle}
                                  placeholder="Enter Event Title"
                                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 
                                            focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 mb-3 pl-3"
                                  placeholderTextColor="#9CA3AF"
                                />
                              <Text className="text-sm font-semibold text-gray-700 mb-2">Subtitle</Text>
                                <TextInput
                                  value={subtitle}
                                  onChangeText={setSubtitle}
                                  placeholder="Enter Event Subtitle"
                                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 
                                            focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 mb-3 pl-3"
                                  placeholderTextColor="#9CA3AF"
                                />
                              <Text className="text-sm font-semibold text-gray-700 mb-2">Description</Text>
                                <TextInput
                                  value={description}
                                  onChangeText={setDescription}
                                  placeholder="Enter Event Description"
                                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 
                                            focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 mb-3 pl-3"
                                  placeholderTextColor="#9CA3AF"
                                  multiline
                                  numberOfLines={5}
                                />
                            </View>
              

                {/* Event Details Section */}
                <View className="pb-6 border-b border-gray-200 mt-5">
                <Text className="text-xl font-semibold text-gray-800 mb-4">
                  Event Contents
                </Text>
                <Text className="text-sm font-semibold text-gray-700 mb-2">Venue</Text>
                  <TextInput
                    value={venue}
                    onChangeText={setVenue}
                    placeholder="Enter Event Venue"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 
                              focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 mb-3 "
                    placeholderTextColor="#9CA3AF"
                  />
                
                {/* Date and Time Row */}
                <View className="flex-row space-x-4">
                <View className="flex-1">
                    <Text className="text-sm font-semibold text-gray-700 mb-2">
                      Date
                    </Text>
                    <TouchableOpacity 
                      className="border border-gray-300 rounded-lg p-3 bg-white flex-row justify-between items-center mr-1 mb-3" 
                      onPress={() => setOpenStartDatePicker(true)}
                    >
                      <Text className="text-gray-700">{date || "Select Date"}</Text>
                      <Feather name="calendar" size={20} color="gray" />
                    </TouchableOpacity>

                    <DatePickerModal
                      open={openStartDatePicker}
                      selectedDate={date}
                      onChangeStartDate={(selectedDate) => setDate(selectedDate)}
                      onClose={() => setOpenStartDatePicker(false)}
                    />
                  </View>

                  <View className="flex-1">
                    <Text className="text-sm font-semibold text-gray-700 mb-2">
                      Time  
                    </Text>
                    <TouchableOpacity className="border border-gray-300 rounded-lg p-3 bg-white flex-row justify-between items-center ml-1 mb-3" onPress={() => setOpenTimePicker(true)}>
                    <Text className="text-gray-700">{selectedTime || "Select Time"}</Text>
                    <Feather name="clock" size={20} color="gray" />
                    </TouchableOpacity>

                    <TimePickerModal
                      open={openTimePicker}
                      selectedTime={selectedTime}
                      onChangeTime={(time) => {
                        setSelectedTime(time);
                        setOpenTimePicker(false);
                      }}
                      onClose={() => setOpenTimePicker(false)}
                    />

                  </View>
                </View>

                <View>
                <Text className="text-sm font-semibold text-gray-700 mb-2">Location Link</Text>
                <View className="text-lg border border-gray-300 rounded-lg bg-white justify-between items-center ml-1 mb-3">
                  <RNPickerSelect
                    onValueChange={(value) => setLocationLink(value)}
                    items = {[
                      { label: "Red Building", value: "https://maps.app.goo.gl/rL3rRjc6icGtmXAX9" },
                      { label: "CEG Square", value: "https://maps.app.goo.gl/9Kb4KUM5rAo7Bemh9" },
                      { label: "Department of Maths", value: "https://maps.app.goo.gl/JvWqm1WZkSJ6XnRn8" },
                      { label: "Department of Computer Science and Engineering", value: "https://maps.app.goo.gl/JgGfbozazsgLvXJw9" },
                      { label: "Department of Information Science and Technology", value: "https://maps.app.goo.gl/hYvaEhXhpamcR2RU6" },
                      { label: "Department of Electronics and Communication Engineering", value: "https://maps.app.goo.gl/n4S449236mD87Y1f7" },
                      { label: "Department of Mechanical Engineering", value: "https://maps.app.goo.gl/yWfMJjmvwoqUkt9Z6" },
                      { label: "Department of Civil Engineering", value: "https://maps.app.goo.gl/1PpycAn9mD6XXPyP7" },
                      { label: "Department of Electrical and Electronics Engineering", value: "https://maps.app.goo.gl/PwgXbKUCo72zpE1V7" },
                      { label: "Department of Mining Engineering", value: "https://maps.app.goo.gl/ZfYfDiwE3JZjDNgW9" },
                      { label: "Department Of Manufacturing Engineering", value: "https://maps.app.goo.gl/jw3MjcPe2zp9GyrVA" },
                      { label: "Department of Printing Technology", value: "https://maps.app.goo.gl/Bww5fBU51n3bXr126" },
                      { label: "Department of Industrial Engineering", value: "https://maps.app.goo.gl/p3xhoKJAdsVBTxiV8" },
                      { label: "Department Of Geology", value: "https://maps.app.goo.gl/dPSuyfat3VmFPAN29" },
                      { label: "Knowledege Park", value: "https://maps.app.goo.gl/zsMmU6cMgynTxENi7" },
                      { label: "Science and Humanities", value: "https://maps.app.goo.gl/rH1fYCzkJy9Sg3aJ7" },
                      { label: "State Bank of India", value: "https://maps.app.goo.gl/qj2t8cWYLhmitV9d6" },
                      { label: "Vivekananda Auditorium", value: "https://maps.app.goo.gl/PN1J1hP9Kbyty2vn7" },
                      { label: "Tag Auditorium", value: "https://maps.app.goo.gl/6YEJR63ChzDYh4ZX9" },
                      { label: "ACOE", value: "https://maps.app.goo.gl/rwNA7LjPNPiixXaU8" },
                      { label: "CEG Tech Forum", value: "https://maps.app.goo.gl/hezNFJTrJ85UewxM9" },
                      { label: "Alumni Centre", value: "https://maps.app.goo.gl/Y3vE614piMBfVnzLA" },
                      { label: "Students Amenities centre", value: "https://maps.app.goo.gl/p9hQZwHbod1qV49v8" },
                      { label: "Health Centre", value: "https://maps.app.goo.gl/8Ypr9Tb96BSQnjov5" },
                      { label: "Gurunath Store", value: "https://maps.app.goo.gl/SBrMMGwLcdEJaEUV6" },
                      { label: "Transportation Engineering Department", value: "https://maps.app.goo.gl/qdCj9DDvsF3WX3Ga7" },
                      { label: "High Voltage Laboratory", value: "https://maps.app.goo.gl/X8Eba6SAN1JhqFng6" },
                      { label: "Division of Soil Mechanics and Foundation Management", value: "https://maps.app.goo.gl/UECK1D5fqMnjfMTq9" },
                      { label: "Engineering Design Division", value: "https://maps.app.goo.gl/U86VaVrvMmUp2pxZ6" },
                      { label: "Structural Engineering", value: "https://maps.app.goo.gl/2hG8qTGmfae8zgRw7" },
                      { label: "Cooperative Store-Anna University", value: "https://maps.app.goo.gl/LKnN9xK8ZfjRixEB7" },
                      { label: "Water Resources", value: "https://maps.app.goo.gl/LZcmeyzkMZVpFtWG8" },
                      { label: "Institute of Ocean Management", value: "https://maps.app.goo.gl/ACAQxnJq63RLcNNS8" },
                      { label: "Department Of Physics And Chemistry", value: "https://maps.app.goo.gl/xY84ZDkswCaEppcR7" },
                      { label: "Anna University Central Library", value: "https://maps.app.goo.gl/ipKga5twscDLq4BQ7" },
                      { label: "Ramanujan Computing Centre", value: "https://maps.app.goo.gl/2ioqJ7xdwPUdHLPE6" },
                      { label: "Anna University Sports Board", value: "https://maps.app.goo.gl/y9RddYZ9rVvdK4C78" },
                    ]}
                    
                    placeholder={{ label: "Select location", value: "" , fontSize: 7}}
                    style={{
                      inputIOS: { fontSize: 7 },
                      inputAndroid: { fontSize: 7 },
                    }}
                  />
                </View>
              </View>


                              {/* Upload Image */}
                <Text className="text-sm font-semibold text-gray-700 mt-3">
                        Poster
                      </Text>
                <View className="flex items-center justify-center p-4 pb-6">
                  {selectedImage ? (
                    <Image source={{ uri: selectedImage }} className="w-60 h-60 rounded-lg shadow-lg mb-4" />
                  ) : (
                    <View className="w-60 h-60 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                      <Text className="text-gray-500">No Image Selected</Text>
                    </View>
                  )}

                  {/* Upload/Change Button */}
                  <TouchableOpacity onPress={pickImage} className="bg-indigo-600 px-6 py-3 rounded-lg shadow-md active:scale-95">
                    <Text className="text-white text-lg font-medium">{selectedImage ? "Change Image" : "Upload Image"}</Text>
                  </TouchableOpacity>
                </View>


              </View>

                {/* Additional Information Section */}
                <View className="pb-6 mt-5">
                  <Text className="text-xl font-semibold text-gray-800 mb-4">
                    Additional Information
                  </Text>
                <Text className="text-sm font-semibold text-gray-700 mb-2">Registration Link</Text>
                  <TextInput
                    value={registration}
                    onChangeText={setRegistration}
                    placeholder="Enter Registration link"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 
                              focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 mb-3 pl-3"
                    placeholderTextColor="#9CA3AF"
                  />

                <Text className="text-sm font-semibold text-gray-700 mb-2">Instagram Link</Text>
                  <TextInput
                    value={instaLink}
                    onChangeText={setInstaLink}
                    placeholder="Enter Instagram link"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 
                              focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 mb-3 pl-3"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>

              {/* Submit Button */}
              <TouchableOpacity className="bg-gray-100 py-3 rounded-lg shadow-sm border mb-9" onPress={handleSubmit}>
                <Text className="text-gray-700 text-lg font-medium text-center">Create event</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OpenCallAdmincopy;
