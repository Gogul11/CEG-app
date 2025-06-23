import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
  SafeAreaView,
  Alert,
  Platform,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const ItemDescription = () => {
  const route = useRoute();
  const { itemDetails } = route.params;

  // const openWhatsApp = (phoneNumber) => {
  //   const whatsappURL = `https://wa.me/${phoneNumber}`;
  //   Linking.canOpenURL(whatsappURL)
  //     .then((supported) => {
  //       if (supported) {
  //         Linking.openURL(whatsappURL);
  //       } else {
  //         Alert.alert("Error", "WhatsApp is not installed on this device.");
  //       }
  //     })
  //     .catch((err) =>
  //       console.error("An error occurred while opening WhatsApp:", err)
  //     );
  // };

  const openWhatsApp = (phoneNumber) => {
    const url = `whatsapp://send?phone=${phoneNumber}`;
  
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert("Error", "WhatsApp is not installed on this device.");
        }
      })
      .catch((err) => console.error("Error opening WhatsApp:", err));
  };
  
  

  const callNumber = (phoneNumber) => {
    const phoneCallURL = `tel:${phoneNumber}`;
    Linking.canOpenURL(phoneCallURL)
      .then((supported) => {
        if (supported) {
          Linking.openURL(phoneCallURL);
        } else {
          Alert.alert('Error', 'Phone call is not supported on this device.');
        }
      })
      .catch((err) =>
        console.error("Error while trying to make a call:", err)
      );
  };

  return (
    <SafeAreaView className="flex-1 bg-white h-screen">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="p-4">
        <View className="shadow-lg rounded-xl overflow-hidden mt-[70px]">
          <LinearGradient
            colors={['#bae6fd', '#38bdf8', '#bae6fd','#38bdf8', '#bae6fd']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="p-6 rounded-xl"
          >
            <Image
              source={{ uri: itemDetails.image }}
              className="w-full h-64 rounded-xl mb-4"
              resizeMode="cover"
            />
            <Text className="text-2xl font-pbold text-black mb-4">
              {itemDetails.item_name}
            </Text>
            <Text className="text-lg font-pmedium text-black mb-2">
              <Text className="font-psemibold">Description: </Text>
              {itemDetails.description}
            </Text>
            <Text className="text-lg font-pmedium text-black mb-2">
              <Text className="font-psemibold">Username: </Text>
              {itemDetails.user_name}
            </Text>
            <Text className="text-lg font-pmedium text-black mb-2">
              <Text className="font-psemibold">Contact: </Text>
              {itemDetails.contact_number}
            </Text>
            <Text className="text-lg font-pmedium text-black mb-2">
              <Text className="font-psemibold">Special Marks: </Text>
              {itemDetails.special_marks}
            </Text>

            <View className="flex-row justify-between items-center mt-6">
              <TouchableOpacity
                className="bg-primary p-4 rounded-full flex-1 mr-2 shadow-md"
                onPress={() => callNumber(itemDetails.contact_number)}
              >
                <Text className="text-quaternary text-center font-psemibold text-lg">
                  📞 Call
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-primary p-4 rounded-full flex-1 shadow-md"
                onPress={() => openWhatsApp(itemDetails.contact_number)}
              >
                <Text className="text-quaternary text-center font-psemibold text-lg">
                  💬 WhatsApp
                </Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ItemDescription;
