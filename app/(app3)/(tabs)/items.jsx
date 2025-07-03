import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  Modal,
  Linking,
  Alert,
} from 'react-native';
import { useFocusEffect } from 'expo-router';
import SearchIcon from '../../../components/app3/search';
import Navbar from '../../../components/app3/navbar';
import { LinearGradient } from 'expo-linear-gradient';
import images from '../../../constants/index';
import Civil from '../../../assets/app3/images/Civil.png';

const dummyItems = [
  {
    item_id: 1,
    item_name: 'Black Wallet',
    reason: 'Lost',
    location: 'Library',
    image: Civil,
    created_at: '2025-07-01',
    description: 'Leather wallet with cards and cash inside',
    user_name: 'John Doe',
    contact_number: '9025298471',
    special_marks: 'Red stitching on one side',
  },
  {
    item_id: 2,
    item_name: 'White Umbrella',
    reason: 'Found',
    location: 'Cafeteria',
    image: Civil,
    created_at: '2025-07-01',
    description: 'Plastic white umbrella with blue dots',
    user_name: 'Jane Smith',
    contact_number: '919812345678',
    special_marks: 'Bent metal tip',
  },
  {
    item_id: 3,
    item_name: 'Green Backpack',
    reason: 'Found',
    location: 'Library',
    image: Civil,
    created_at: '2025-07-02',
    description: 'Green backpack with multiple compartments',
    user_name: 'Jane Smith',
    contact_number: '919812345678',
    special_marks: 'Bent metal tip',
  },
];

const ItemsPage = () => {
  const [searchItem, setSearchItem] = useState('');
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [load, setLoad] = useState(false);
  const textInputRef = useRef(null);

  const getItems = async () => {
    setItems(dummyItems);
  };

  useFocusEffect(
    useCallback(() => {
      getItems();
    }, [])
  );

  useEffect(() => {
    setLoad(false);
    const timer = setTimeout(() => setLoad(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const formatDateKey = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
      date.getDate()
    ).padStart(2, '0')}`;
  };

  const formatDisplayDate = (dateKey) => {
    const [year, month, day] = dateKey.split('-');
    return `${day} ${month} ${year.slice(-2)}`;
  };

  const filteredItems = items.filter((item) =>
    item.item_name.toLowerCase().includes(searchItem.toLowerCase())
  );

  const groupedItems = filteredItems.reduce((acc, item) => {
    const dateKey = formatDateKey(item.created_at);
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(item);
    return acc;
  }, {});

  const sortedDateKeys = Object.keys(groupedItems).sort((a, b) => b.localeCompare(a));

  const openWhatsApp = (phoneNumber) => {
    const cleanNumber = phoneNumber.replace(/\D/g, '');
    const url = `whatsapp://send?phone=${cleanNumber}`;
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) Linking.openURL(url);
        else Alert.alert('Error', 'WhatsApp is not installed.');
      })
      .catch((err) => console.error(err));
  };

  const callNumber = (phoneNumber) => {
    const url = `tel:${phoneNumber}`;
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) Linking.openURL(url);
        else Alert.alert('Error', 'Call is not supported.');
      })
      .catch((err) => console.error(err));
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {load ? (
        <View className="flex-1 mb-4">
          <View className="h-9 bg-white mb-1" />
          <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            <Navbar />
            <TouchableWithoutFeedback onPress={() => textInputRef.current?.focus()}>
              <View className="flex flex-row w-[320px] h-12 rounded-xl px-2 mt-4 mb-4 ml-4 items-center justify-between border-2 bg-white border-[#cbcbcb]">
                <TextInput
                  ref={textInputRef}
                  onChangeText={(text) => setSearchItem(text)}
                  placeholder="Search for an item"
                  placeholderTextColor="#898989"
                  className="flex-1 text-black"
                />
                <Image source={images.search} className="w-8 h-8 ml-2" />
              </View>
            </TouchableWithoutFeedback>

            {sortedDateKeys.map((dateKey) => (
              <View key={dateKey} className="mb-6 ml-4">
                <Text className="text-xl font-bold text-black mb-4">
                  {formatDisplayDate(dateKey)}
                </Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {groupedItems[dateKey].map((item) => (
                    <TouchableOpacity
                      key={item.item_id}
                      onPress={() => {
                        setSelectedItem(item);
                        setModalVisible(true);
                      }}
                      activeOpacity={0.9}
                      className="mr-4 rounded-[16px] overflow-hidden shadow-md"
                    >
                      <LinearGradient
                        colors={['#cbcbcb', '#898989']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        className="w-64 p-2 rounded-[16px]"
                      >
                        <Image
                          source={typeof item.image === 'string' ? { uri: item.image } : item.image}
                          className="w-full h-48 mb-2 rounded-[16px]"
                          resizeMode="cover"
                        />
                        <Text className="text-xl font-semibold mb-1 text-white">{item.item_name}</Text>
                        <Text className="text-sm text-white capitalize">
                          {item.reason} Near: {item.location}
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            ))}

            <Modal visible={modalVisible} animationType="slide" onRequestClose={() => setModalVisible(false)}>
              <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="p-4 bg-white">
                {selectedItem && (
                  <View className="shadow-lg rounded-xl overflow-hidden mt-[70px]">
                    <LinearGradient
                      colors={['#cbcbcb', '#898989', '#cbcbcb']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      className="p-6 rounded-xl"
                    >
                      <Image
                        source={
                          typeof selectedItem.image === 'string'
                            ? { uri: selectedItem.image }
                            : selectedItem.image
                        }
                        className="w-full h-64 rounded-xl mb-4"
                        resizeMode="cover"
                      />

                      <Text className="text-2xl font-bold text-black mb-4">
                        {selectedItem.item_name}
                      </Text>

                      <Text className="text-lg text-black mb-2">
                        <Text className="font-semibold">Description: </Text>
                        {selectedItem.description}
                      </Text>

                      <Text className="text-lg text-black mb-2">
                        <Text className="font-semibold">Username: </Text>
                        {selectedItem.user_name}
                      </Text>

                      <Text className="text-lg text-black mb-2">
                        <Text className="font-semibold">Contact: </Text>
                        {selectedItem.contact_number}
                      </Text>

                      <Text className="text-lg text-black mb-2">
                        <Text className="font-semibold">Special Marks: </Text>
                        {selectedItem.special_marks}
                      </Text>

                      <View className="flex-row justify-between items-center mt-6">
                        <TouchableOpacity
                          className="bg-[#cbcbcb] p-4 rounded-full flex-1 mr-2 shadow"
                          onPress={() => callNumber(selectedItem.contact_number)}
                        >
                          <Text className="text-white text-center font-semibold text-lg">📞 Call</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          className="bg-[#898989] p-4 rounded-full flex-1 shadow"
                          onPress={() => openWhatsApp(selectedItem.contact_number)}
                        >
                          <Text className="text-white text-center font-semibold text-lg">💬 WhatsApp</Text>
                        </TouchableOpacity>
                      </View>

                      <TouchableOpacity
                        onPress={() => setModalVisible(false)}
                        className="mt-6 p-3 bg-black rounded-xl"
                      >
                        <Text className="text-white text-center font-semibold">Close</Text>
                      </TouchableOpacity>
                    </LinearGradient>
                  </View>
                )}
              </ScrollView>
            </Modal>
          </ScrollView>
        </View>
      ) : (
        <SearchIcon />
      )}
    </SafeAreaView>
  );
};

export default ItemsPage;
