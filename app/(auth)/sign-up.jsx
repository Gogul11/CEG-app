import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form'
import { Link } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import axios from 'axios';
import env from "../env";
const SignUp = () => {
	const router = useRouter();
	const[show, setShow] = useState(true)
	const[show1, setShow1] = useState(true)


	const signUpschema = z.object({
		user_name : z.string().min(5, 'User Name must atleast contain 5 characters'),
		email_id: z.string().email('Invlaid Email'),
		phone_number : z.string()
					.length(10, 'Phone number must be exactly 10 characters')
					.regex(/^\d{10}$/, 'Phone number must contain only digits'),
		password : z.string().min(8, 'Password Should contain 8 Characters'),
		cpassword : z.string().min(8, 'Password Should contain 8 Characters')
	}).refine(data => data.cpassword === data.password, {
		message:'The Passwords does\'nt match',
		path:["cpassword"]
	})


	const{control, handleSubmit, formState:{errors}, reset} = useForm({
		resolver:zodResolver(signUpschema)
	})

	const API_URL = env.API_URL;
	const onSignUp = async (data) => {
		try{
			const response = await axios.post(`${API_URL}/register`, data)
			if(response.status === 200){
				router.push('/sign-in')
				console.log("Signed Up Successfully");
			} else {
				console.log("Error during Sign Up");
			}

		} catch(error){
			console.error("Error during Sign Up:", error.response?.data || error.message)
		}
	}

	const Textstyle = 'text-[16px] my-2 text-[#898989] font-pmedium'
	const InputStyle = 'bg-[#cbcbcb]/30 h-[40px] w-[300px] border-[1px] border-[#898989] rounded-[10px] pl-4'

	return (
		<ScrollView contentContainerStyle={{flexGrow:1}}>
		<SafeAreaView className='flex-1 flex-row justify-center items-center bg-white'>
			<View className='flex-1 flex-col justify-center items-center'>

				<Text className='text-black font-psemibold text-[25px]'>
					SIGN UP
				</Text>

				<View className=''>
					<View>
						<Text className={Textstyle}>Email Id : </Text>
						<Controller
							control={control}
							name='email_id'
							render={({ field : {onChange, value}}) => (
								<TextInput
									className={InputStyle}
									onChangeText={onChange}
									value={value}
								/>
							)}
						/>
						{errors.email_id && (
							<Text className='text-red-500 font-light m-2'>{errors.email_id.message}</Text>
						)}
					</View>
					<View>
						<Text className={Textstyle}>User Name : </Text>
						<Controller
							control={control}
							name='user_name'
							render={({ field : {onChange, value}}) => (
								<TextInput
									className={InputStyle}
									onChangeText={onChange}
									value={value}
								/>
							)}
						/>
						{errors.user_name && (
							<Text className='text-red-500 font-light m-2'>{errors.user_name.message}</Text>
						)}
					</View>
					<View>
						<Text className={Textstyle}>Phone Number : </Text>
						<Controller
							control={control}
							name='phone_number'
							render={({ field : {onChange, value}}) => (
								<TextInput
									className={InputStyle}
									onChangeText={onChange}
									value={value}
								/>
							)}
						/>
						{errors.phone_number && (
							<Text className='text-red-500 font-light m-2'>{errors.phone_number.message}</Text>
						)}
					</View>
					<View>
						<Text className={Textstyle}>Password : </Text>
						<Controller
							control={control}
							name='password'
							render={({ field : {onChange, value}}) => (
								<TextInput
									className={InputStyle}
									onChangeText={onChange}
									value={value}
									secureTextEntry={show}
								/>
							)}
						/>
						{/* <TouchableOpacity
							onPress={() => setShow(!show)}
							className='relative left-[270px] bottom-[32px]'
						>
							<Ionicons
								name={show ? 'eye-off' : 'eye'}
								size={20}
							/>
						</TouchableOpacity> */}
						{errors.password && (
							<Text className='text-red-500 font-light m-2'>{errors.password.message}</Text>
						)}
					</View>
					<View>
						<Text className={Textstyle}>Confirm Password : </Text>
						<Controller
							control={control}
							name='cpassword'
							render={({ field : {onChange, value}}) => (
								<TextInput
									className={InputStyle}
									onChangeText={onChange}
									value={value}
									secureTextEntry={show1}
								/>
							)}
						/>
						{/* <TouchableOpacity
							onPress={() => setShow1(!show1)}
							className='relative left-[270px] bottom-[32px]'
						>
							<Ionicons
								name={show1 ? 'eye-off' : 'eye'}
								size={20}
							/>
						</TouchableOpacity> */}
						{errors.cpassword && (
							<Text className='text-red-500 font-light m-2'>{errors.cpassword.message}</Text>
						)}
					</View>
					<View className='flex mt-7 flex-row justify-center items-center'>
						<TouchableOpacity
							className='bg-[#898989] h-[40px] w-[300px] justify-center rounded-[10px]'
							onPress={handleSubmit(onSignUp)}
						>
							<Text className='text-center text-xl text-black'>Sign Up</Text>
						</TouchableOpacity>
					</View>
				</View>

				<View>
					<Text className='font-psemibold text-[16px] m-[30px] text-black'>
						Already Signed In ? {'\t\t'}
						<Link 
							href='/sign-in'
							className='text-[#898989] '
						>Sign In</Link>
					</Text>
				</View>
			</View>
		</SafeAreaView>
		</ScrollView>
	)
}

export default SignUp