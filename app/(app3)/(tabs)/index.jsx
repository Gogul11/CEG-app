import { View, Text, ScrollView, Button, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { StatusBar } from 'expo-status-bar'
import { Link } from 'expo-router'
import Navbar from '../../../components/app3/navbar'
import AnimatedCard from '../../../components/app3/card'
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from '@expo/vector-icons/AntDesign';


import { useFocusEffect } from 'expo-router'
const Default = () => {
    const [log, setLog] = useState(false);
    useFocusEffect(
        useCallback(() => {
          const checkAuth = async () => {
            try {
              const token = await AsyncStorage.getItem("authToken");
              setLog(!!token);
            } catch (error) {
              console.error("Error checking auth:", error);
            }
          };
          
          checkAuth();
        }, [])
      );
      
      const[about, setAbout] = useState(false)
      const[about2, setAbout2] = useState(false)
    

    const Option = ({content}) => {

        return(
            <TouchableOpacity>
                <LinearGradient
                    colors={['#bae6fd', '#38bdf8']}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    className="flex-1 justify-center items-center w-[150px] h-[50px]"
                >
                        <Text
                            className='text-center text-white'
                        >{content}</Text>
                </LinearGradient>
            </TouchableOpacity>
        )
    }

return (
    <SafeAreaView className='flex-1 bg-white'>
        <StatusBar style='dark'/>
        <ScrollView contentContainerStyle={{flexGrow : 1}} className='flex'>
            {/* <Navbar/> */}
           
            <View className='flex-1 flex-col justify-end items-center m-5 gap-5'>
                <Text
                    className='text-[30px] font-pbold text-[#898989]'
                >College of {'\n'}Engineering Guindy</Text>

                <View className='flex-1 flex-row justify-center items-center'>
                    {/* <AnimatedCard/> */}
                </View>

                
                {!log && (
                        <View className='flex flex-col gap-[20px] '>
                            <View>
                                <TouchableOpacity className='h-[40px] w-[250px] bg-[#cbcbcb] flex flex-col justify-center rounded-[10px]'>
                                    <Link className='text-black text-center' href='/sign-in'>
                                        SIGN IN
                                    </Link>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <TouchableOpacity className='h-[40px] w-[250px] bg-[#cbcbcb] flex flex-col justify-center rounded-[10px]'>
                                    <Link className='text-black text-center' href='/sign-up'>
                                        SIGN UP
                                    </Link>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}

                
                    <View className='flex flex-col justify-center items-center my-[20px]'>
                        <Text className='text-[20px] text-[#898989] font-pmedium '>About</Text>
                        <TouchableOpacity
                            onPress={() => setAbout(!about)}
                        >
                            <AntDesign name={about ? "caretup" : "caretdown"} size={24} color="#898989" />
                        </TouchableOpacity>
                        {about &&
                                <Text className='text-[17px] text-black font-pmedium ml-3'>
                                    The  App simplifies campus life with two key features: Lost and Found, 
                                    where users can report or reclaim lost items, and Campus Map, which helps navigate important locations. 
                                    Designed for convenience, it enhances accessibility and connectivity for students and faculty.
                                </Text>
                        }
                    </View>

                    <View className='flex flex-col justify-center items-center my-[20px] '>
                        <Text className='text-[20px] text-[#898989] font-pmedium'>Who are We ?</Text>

                        <TouchableOpacity
                            onPress={() => setAbout2(!about2)}
                        >
                            <AntDesign name={about2 ? "caretup" : "caretdown"} size={24} color="#898989" />
                        </TouchableOpacity>
                        {about2 &&
                                <Text className='text-[17px] text-black m-3 font-pmedium'>
                                    We are the Technical Team of 
                                        <Link 
                                            href='https://www.projects.cegtechforum.in/'
                                            className='text-primary'
                                        > Projects & Research </Link> 
                                    CTF Club, a initiative launched  to 
                                    drive innovation and campus welfare projects. As a dedicated group of tech enthusiasts, we focus on 
                                    developing solutions that enhance student life, streamline campus services, and improve overall accessibility. 
                                    Our mission is to leverage technology for the betterment of our college community, making a meaningful impact 
                                    through practical and efficient digital solutions.
                                </Text>
                        }
                       
                    </View>

            </View>
        </ScrollView>
    </SafeAreaView>
)
}

export default Default