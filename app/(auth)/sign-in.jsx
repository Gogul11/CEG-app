import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, KeyboardAvoidingView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import env from "../env";
import CustomButton from '../../components/button';
import { signInValidationSchema } from '../../utils/app3/signInValidation';
import { Formik } from 'formik';
import { signInFormInitialValues } from '../../constants/formConstants';
import { toFormikValidationSchema } from 'zod-formik-adapter';

const SignIn = () => {
  const router = useRouter();

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
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <KeyboardAvoidingView>
			<View className="h-full flex flex-col justify-center">
				<Text className="text-2xl text-black font-pbold text-center">Sign In</Text>
				<View className="flex items-center mt-8">
			
					<Formik
						initialValues={signInFormInitialValues}
						validationSchema={toFormikValidationSchema(signInValidationSchema)}
						onSubmit={(values, {resetForm}) => {
							console.log(values)
							resetForm()
						}}
					>
					{({handleSubmit, values, handleChange, handleBlur, errors, touched}) => (
						<View
							className='flex gap-4 justify-center items-center'
						>
							<View>
								<Text className="text-lg text-[#898989] font-psemibold text-secondary">Email</Text>
								<TextInput
									className="w-[300px] h-12 border-2 border-[#898989] rounded-xl pl-4 mt-2 bg-[#cbcbcb]/30"
									placeholder='Email'
									value={values.email_id}
									onChangeText={handleChange('email_id')}
									onBlur={handleBlur('email_id')}
								/>
								{touched.email_id && errors.email_id && <Text className="text-red-500 mt-1">{errors.email_id}</Text>}
							</View>
		
							<View>
								<Text className="text-lg text-[#898989] font-psemibold ">Password</Text>
								<TextInput
									className="w-[300px] h-12 border-2 border-[#898989] rounded-xl pl-4 mt-2 bg-[#cbcbcb]/30"
									placeholder='Password'
									value={values.password}
									onChangeText={handleChange('password')}
									onBlur={handleBlur('password')}
									secureTextEntry = {show}
								/>
								{touched.password && errors.password && <Text className="text-red-500 mt-1">{errors.password}</Text>}
							</View>
		
							<CustomButton
								text='Forgot Password ?'
								buttonStyle=''
								textStyle='text-sm text-blue-500'
								buttonFunction={() => router.push('/otp-section')}
							/>
		
							<CustomButton
								text='Sign In'
								buttonFunction={handleSubmit}
							/>
						</View>
					)}
					</Formik>
				</View>
				  
				<View className='flex flex-col items-center gap-4 mt-8'>
					<Text className="text-lg font-psemibold text-secondary">Don't have an account?</Text>
					<CustomButton
						text='Sign Up'
						buttonFunction={() => router.push('/sign-up')}
					/>
				</View>
			</View>
		</KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
