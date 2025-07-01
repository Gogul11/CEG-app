import React, { useState, useRef } from "react";
import {
View,
Text,
TextInput,
Alert,
TouchableOpacity,
ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {z} from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { router } from "expo-router";
import env from "../env";
import SlideUpMessage from '../../components/app3/successMessage'

export default function OTPVerification() {
	const [otpVisible, setOtpVisible] = useState(false);
	const [otp, setOtp] = useState(["", "", "", "", "", ""]);
	const otpRefs = Array(6)
	  .fill(null)
	  .map(() => useRef(null));
	const [otpErr, setOtpErr] = useState("");
	const emailRef = useRef(""); 
	const API_URL = env.API_URL;
  
	const emailSchema = z.object({
	  email: z.string().email("Invalid email address"),
	});
  
	const { control, handleSubmit, formState: { errors } } = useForm({
	  resolver: zodResolver(emailSchema),
	});
  
	const handleSendOTP = async (data) => {
		setSuccess(true)
		setOtpVisible(true);
	  try {
		const response = await fetch(`${API_URL}/send`, {
		  method: "POST",
		  headers: { "Content-Type": "application/json" },
		  body: JSON.stringify({ email: data.email }),
		});
  
		if (response.ok) {
		  emailRef.current = data.email;
		} else {
		  alert("Failed to send OTP");
		}
	  } catch (error) {
		console.error("Error sending OTP:", error);
	  }
	};
  
	const handleOTPChange = (text, index) => {
	  const newOtp = [...otp];
	  newOtp[index] = text.replace(/[^0-9]/g, "");
	  setOtp(newOtp);
  
	  if (text && index < otpRefs.length - 1) {
		otpRefs[index + 1].current.focus();
	  } else if (!text && index > 0) {
		otpRefs[index - 1].current.focus();
	  }
	};
  
	const handleVerifyOTP = async () => {
	  const enteredOtp = otp.join("");
  
	  if (enteredOtp.length !== 6) {
		setOtpErr("Please enter the full 6-digit OTP.");
		return;
	  }
	  setOtpErr("");
  
	  try {
		const response = await fetch(`${API_URL}/verify`, {
		  method: "POST",
		  headers: { "Content-Type": "application/json" },
		  body: JSON.stringify({ email: emailRef.current, otp: enteredOtp }),
		});
  
		const result = await response.json();
  
		if (response.ok) {
		  router.push("/forget-password");
		} else {
		  setOtpErr("Invalid OTP. Try again.");
		}
	  } catch (error) {
		console.error("Error verifying OTP:", error);
	  }
	};

	const[success, setSuccess] = useState(false)

return (
	<SafeAreaView className='flex-1 bg-white flex-row justify-center items-center'>
		<ScrollView contentContainerStyle={{ flexGrow: 1 }} className='flex'>
			<View className='flex-1 flex-col p-4 items-center justify-center'>
				<View className="mt-5 w-full px-6">
					<Text className="text-[18px] text-[#898989] font-medium">Enter Email</Text>
					<Controller
					control={control}
					name="email"
					render={({ field: { onChange, value } }) => (
						<TextInput
						className="bg-[#cbcbcb]/30 h-[50px] w-full border-[1px] border-[#898989] rounded-[10px] p-3 mt-2"
						placeholder="Enter your email"
						keyboardType="email-address"
						autoCapitalize="none"
						value={value}
						onChangeText={onChange}
						/>
					)}
					/>
					{errors.email && <Text className="text-red-600 mt-1">{errors.email.message}</Text>}

					{!otpVisible && (
					<TouchableOpacity
						className="bg-[#898989] h-[40px] w-full rounded-[10px] justify-center mt-5"
						onPress={handleSubmit(handleSendOTP)}
					>
						<Text className="text-center">Send OTP</Text>
					</TouchableOpacity>
					)}
			</View>

				<View>
					{!otpVisible && (
						<View
							className='items-center'
						>
							<Text
								className='text-[20px] text-[#898989] font-psemibold my-4'
							>Enter OTP</Text>
							<View className='flex flex-row justify-between gap-4 w-full px-6'>
								{otp.map((digit, index) => (
								<TextInput
									key={index}
									ref={otpRefs[index]}
									className='h-14 w-[13%] rounded-lg bg-[#cbcbcb]/30 text-center text-quaternary border-[#898989] border-2 font-bold text-[18px]'
									keyboardType="numeric"
									maxLength={1}
									value={digit}
									onChangeText={(text) => handleOTPChange(text, index)}
								/>
								))}
							</View>

							{otpErr && (
								<Text className='text-red-600 my-4'>{otpErr}</Text>
							)}
							<TouchableOpacity
								className='h-[40px] w-[140px] bg-[#898989] rounded-[10px] justify-center mt-[50px]'
								onPress={handleVerifyOTP}
							>
								<Text
									className='text-center text-black text-[16px] '
								>Verify OTP</Text>
							</TouchableOpacity>

							<TouchableOpacity
								className='h-[40px] w-[140px] bg-[#898989] rounded-[10px] justify-center mt-[50px]'
								onPress={() => setOtpVisible(false)}
							>
								<Text
									className='text-center text-black text-[16px] '
								>Resend OTP</Text>
							</TouchableOpacity>
						</View>
					)}
				</View>
				<SlideUpMessage
					message='OTP has beed sent to your Email'
					visible={success}
					onHide={() => setSuccess(false)}
				/>
			</View>
		</ScrollView>
	</SafeAreaView>

);
}
