import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Ionicons } from '@expo/vector-icons'
import { router } from "expo-router";
import env from "../env";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChangePassword = () => {


    const [show, setShow] = useState(true)
    const [show1, setShow1] = useState(true)
    const API_URL = env.API_URL;
    const handleChange = async (data) => {
        try {
            const token = await AsyncStorage.getItem("authToken");
            if (!token) {
                return Alert.alert("Error", "You must be logged in.");
            }

            const response = await axios.post(
                `${API_URL}/change-password`,
                {
                    new_password: data.new_password,
                    conf_password: data.conf_password
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            Alert.alert("Success", response.data.message);
            router.push("/sign-in");
        } catch (error) {
            console.error("Error changing password:", error.response?.data || error.message);
            Alert.alert("Error", "Failed to change password.");
        }
    };

    const passwordSchema = z.object({
        new_password: z.string().min(8, "Password should contain atleast 8 Characters"),
        conf_password: z.string().min(8, "Password should contain atleast 8 Characters"),
    }).refine(data => data.new_password === data.conf_password, {
        message: "The passwords doesn't match",
        path: ['conf_password']
    })

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(passwordSchema)
    })

    return (
        <SafeAreaView className='flex-1 justify-center items-center bg-tertiary'>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} className='flex'>
                <View className='flex-1 flex-col justify-center items-center bg-tertiary gap-[20px]'>
                    <View>
                        <Text
                            className='text-[18px]  text-quaternary font-pmedium'
                        >New Password</Text>
                        <Controller
                            name="new_password"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    className='bg-white h-[45px] w-[250px] border-[1px] border-quaternary rounded-[10px] pl-4 my-4'
                                    placeholder="Enter New Password"
                                    secureTextEntry={show}
                                    value={value}
                                    onChangeText={onChange}
                                />
                            )}
                        />
                        <TouchableOpacity
                            onPress={() => setShow(!show)}
                            className='relative left-[220px] bottom-[45px] m-[0px]'
                        >
                            <Ionicons
                                name={show ? 'eye-off' : 'eye'}
                                size={20}
                            />
                        </TouchableOpacity>
                        {errors.new_password && (
                            <Text className='text-red-500 font-light'>{errors.new_password.message}</Text>
                        )}
                    </View>

                    <View>
                        <Text
                            className='text-[18px] text-quaternary font-pmedium'
                        >
                            Confirm Password
                        </Text>

                        <Controller
                            name="conf_password"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    className='bg-white h-[45px] w-[250px] border-[1px] border-quaternary rounded-[10px] pl-4 my-4'
                                    placeholder="Enter New Password"
                                    secureTextEntry={show1}
                                    value={value}
                                    onChangeText={onChange}
                                />
                            )}
                        />
                        <TouchableOpacity
                            onPress={() => setShow1(!show1)}
                            className='relative left-[220px] bottom-[45px]'
                        >
                            <Ionicons
                                name={show1 ? 'eye-off' : 'eye'}
                                size={20}
                            />
                        </TouchableOpacity>
                        {errors.conf_password && (
                            <Text className='text-red-500 font-light'>{errors.conf_password.message}</Text>
                        )}
                    </View>

                    <TouchableOpacity
                        className='h-[50px] w-[200px] bg-primary justify-center rounded-[10px] my-4'
                        onPress={handleSubmit(handleChange)}
                    >
                        <Text
                            className='text-center text-white'
                        >Change Password</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#BD9A7A",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    input: {
        width: "100%",
        padding: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        backgroundColor: "#fff",
    },
    buttonContainer: {
        width: "100%",
        marginTop: 10,
    },
});

export default ChangePassword;
