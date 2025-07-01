import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { z } from 'zod';
import axios from 'axios';
import env from "../env";
import { Ionicons } from '@expo/vector-icons'

const validationSchema = z.object({
  email_id: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(20, 'Password must not exceed 20 characters'),
});

const SignIn = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(validationSchema),
  });

  const API_URL = env.API_URL;
  
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${API_URL}/login`, data);
      //console.log(response.data);
      if (response.status === 200) {
        const { token, user_id } = response.data;
        if (token && user_id) {
            await AsyncStorage.setItem('authToken', token);
            await AsyncStorage.setItem('userId', user_id.toString()); 
            router.push('/items');
            console.log("Logged in successfully");
        } else {
            console.error("Token or user_id is missing in the response");
        }
    }
    
    } catch (error) {
      if (error.response) {
        console.error("Login error:", error.response.data.message);
        Alert.alert("Error", error.response.data.message || "Login failed");
      } else {
        console.error("Network error:", error);
        Alert.alert("Error", "Unable to connect. Check your network.");
      }
    }
  };

  const[show, setShow] = useState(false)

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-tertiary p-4">
        <View className="min-h-[85vh] flex flex-col justify-center">
          <View className="flex items-center">
            <Text className="text-2xl text-black font-pbold text-primary">Sign In</Text>
          </View>

          <View className="flex items-center mt-8">

            <View className="mt-4">
              <Text className="text-lg text-[#898989] font-psemibold text-secondary">Email</Text>
              <Controller
                name="email_id"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    className="w-[300px] h-12 border-2 border-[#898989] rounded-xl pl-4 mt-2 bg-[#cbcbcb]/30"
                    placeholder="Enter your email"
                    placeholderTextColor="black"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              {errors.email_id && <Text className="text-red-500 mt-1">{errors.email_id.message}</Text>}
            </View>

            <View className="mt-4">
              <Text className="text-lg text-[#898989] font-psemibold ">Password</Text>
              <Controller
                name="password"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    className="w-[300px] h-12 border-2 border-[#898989] rounded-xl pl-4 mt-2 bg-[#cbcbcb]/30"
                    placeholder="Enter your password"
                    placeholderTextColor="black"
									  secureTextEntry={show}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              <TouchableOpacity
                            onPress={() => setShow(!show)}
                            className='relative left-[270px] bottom-[32px]'
                          >
                            <Ionicons
                              name={show ? 'eye-off' : 'eye'}
                              size={20}
                            />
              </TouchableOpacity>
              {errors.password && <Text className="text-red-500 mt-1">{errors.password.message}</Text>}
            </View>
          </View>

          <View className="flex items-center mt-4">
            <TouchableOpacity onPress={() => router.push('/otp-section')}>
              <Text className="text-sm text-blue-500">Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          <View className="flex items-center mt-8">
            <TouchableOpacity
              className="w-[300px] h-10 flex items-center justify-center rounded-md bg-[#cbcbcb]"
              onPress={handleSubmit(onSubmit)}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text className="text-lg font-psemibold text-black text-tertiary">Sign In</Text>
              )}
            </TouchableOpacity>
          </View>

          <View className="flex items-center mt-4">
            <Text className="text-lg font-psemibold text-secondary">Don't have an account?</Text>
          </View>

          <View className="flex items-center mt-2">
            <TouchableOpacity
              className="w-[300px] h-10 flex items-center justify-center rounded-md bg-[#cbcbcb]"
              onPress={() => router.push('/sign-up')}
            >
              <Text className="text-lg font-psemibold text-tertiary text-black">Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
