import React, { useState } from "react";
import { Image, View, TextInput, Text, ScrollView, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform } from "react-native";
import DatePickerModal from "./DatePickerModal";
import { Feather } from "@expo/vector-icons";
import TimePickerModal from "./TimePickerModal";
import * as ImagePicker from "expo-image-picker";


type Announcement = {
  title: string;
  contents: string;
  venue: string;
  date: string;
  time: string;
  regards: string;
  clubName: string;
};

// Define InputField props interface
interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  multiline?: boolean;
  numberOfLines?: number;
}

const getFormattedDate = (date: Date, format = "YYYY/MM/DD") => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based
  const year = date.getFullYear();
  return format === "YYYY/MM/DD" ? `${year}/${month}/${day}` : `${day}/${month}/${year}`;
};

const OpenCallAdmin: React.FC = () => {
  const [clubName, setClubName] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [venue, setVenue] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [regards, setRegards] = useState("");
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(getFormattedDate(new Date(), "YYYY/MM/DD"));
  const [openTimePicker, setOpenTimePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Function to pick an image
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

  const handleSubmit = () => {
    const newAnnouncement: Announcement = {
      title,
      contents,
      venue,
      date,
      time,
      regards,
      clubName,
    };
    console.log(newAnnouncement); // Handle your submission logic here
  };

  // InputField component with proper TypeScript typing
  const InputField: React.FC<InputFieldProps> = ({ 
    label, 
    value, 
    onChangeText, 
    placeholder, 
    multiline = false,
    numberOfLines = 1 
  }) => (
    <View className="mb-4">
      <Text className="text-sm font-semibold text-gray-700 mb-2">
        {label}
      </Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        multiline={multiline}
        numberOfLines={numberOfLines}
        className={`w-full px-4 py-3 rounded-lg border border-gray-300 
          bg-white text-gray-900 ${multiline ? 'min-h-[100px]' : ''} 
          focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200`}
        placeholderTextColor="#9CA3AF"
      />
    </View>
  );

  
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView className="flex-1">
          {/* Main Container */}
          <View className="p-6">
            {/* Header Section */}
            <View className="mb-8 bg-white rounded-xl p-6 shadow-sm">
              <Text className="text-3xl font-bold text-gray-900">
                Create Announcement
              </Text>
              <Text className="text-gray-600 mt-2">
                Fill in the details below to create a new club announcement
              </Text>
            </View>

            {/* Form Section */}
            <View className="bg-white rounded-xl p-6 shadow-sm space-y-6">
              {/* Club Information Section */}
              <View className="pb-6 border-b border-gray-200">
                <Text className="text-xl font-semibold text-gray-800 mb-4">
                  Club Details
                </Text>
                <InputField
                  label="Club Name"
                  value={clubName}
                  onChangeText={setClubName}
                  placeholder="Enter your club name"
                />
              </View>

              {/* Announcement Content Section */}
              <View className="pb-6 border-b border-gray-200">
                <Text className="text-xl font-semibold text-gray-800 mb-4">
                  Announcement Content
                </Text>
                <InputField
                  label="Title"
                  value={title}
                  onChangeText={setTitle}
                  placeholder="Enter announcement title"
                />
                <InputField
                  label="Contents"
                  value={contents}
                  onChangeText={setContents}
                  placeholder="Enter announcement details"
                  multiline
                  numberOfLines={4}
                />
              </View>

              {/* Event Details Section */}
              <View className="pb-6 border-b border-gray-200">
                <Text className="text-xl font-semibold text-gray-800 mb-4">
                  Event Details
                </Text>
                <InputField
                  label="Venue"
                  value={venue}
                  onChangeText={setVenue}
                  placeholder="Enter event venue"
                />
                
                {/* Date and Time Row */}
                <View className="flex-row space-x-4">
                <View className="flex-1">
                    <Text className="text-sm font-semibold text-gray-700 mb-2">
                      Date
                    </Text>
                    <TouchableOpacity 
                      className="border border-gray-300 rounded-lg p-3 bg-white flex-row justify-between items-center" 
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
                    <TouchableOpacity className="border border-gray-300 rounded-lg p-3 bg-white flex-row justify-between items-center" onPress={() => setOpenTimePicker(true)}>
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
              </View>

              <View className="flex items-center justify-center p-4">
                <Text className="text-lg font-semibold text-gray-800 mb-4">
                  Upload Event Poster
                </Text>

                {/* Image Preview */}
                {selectedImage ? (
                  <Image
                    source={{ uri: selectedImage }}
                    className="w-60 h-60 rounded-lg shadow-lg mb-4"
                  />
                ) : (
                  <View className="w-60 h-60 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                    <Text className="text-gray-500">No Image Selected</Text>
                  </View>
                )}

                {/* Upload/Change Button */}
                <TouchableOpacity
                  onPress={pickImage}
                  className="bg-indigo-600 px-6 py-3 rounded-lg shadow-md active:scale-95"
                >
                  <Text className="text-white text-lg font-medium">
                    {selectedImage ? "Change Image" : "Upload Image"}
                  </Text>
                </TouchableOpacity>
              </View>


              {/* Additional Information Section */}
              <View className="pb-6">
                <Text className="text-xl font-semibold text-gray-800 mb-4">
                  Additional Information
                </Text>
                <InputField
                  label="Regards"
                  value={regards}
                  onChangeText={setRegards}
                  placeholder="Enter regards or signing authority"
                />
              </View>

              {/* Submit Button */}
              <TouchableOpacity
                className=" bg-gray-100 py-3 rounded-lg shadow-sm active:scale-95 border"
                onPress={handleSubmit}
              >
                <Text className="text-gray-700 text-lg font-medium text-center">
                  Create Announcement
                </Text>
              </TouchableOpacity>
            </View>

            {/* Bottom Spacing */}
            <View className="h-8" />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OpenCallAdmin;