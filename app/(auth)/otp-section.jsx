import React, { useState, useRef } from "react";
import {
View,
Text,
TextInput,
ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {z} from 'zod'
import { router } from "expo-router";
import env from "../env";
import SlideUpMessage from '../../components/app3/successMessage'
import CustomButton from "../../components/button";
import { Formik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";

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
				<View>
					<Formik
						initialValues={{email : ''}}
						validationSchema={toFormikValidationSchema(emailSchema)}
						onSubmit={(values) => {
							console.log(values)
							setOtpVisible(true)
						}}
					>
						{({handleSubmit,handleChange, values, errors, touched}) => (
							<View>
								<Text className="text-[16px] my-2 text-[#898989] font-pmedium">Enter Email</Text>
								<TextInput
									className="bg-[#cbcbcb]/30 h-[40px] border border-[#898989] rounded-lg pl-4"
									value={values.email}
									onChangeText={handleChange('email')}
								/>
								{errors.email && touched.email && <Text className="text-red-500 mt-1">{errors.email}</Text>}
								<CustomButton 
									text="Send OTP"
									buttonStyle='w-[300px] h-10 flex items-center justify-center rounded-md bg-[#cbcbcb] mt-8'
									textStyle='text-center text-xl text-black'
									buttonFunction={handleSubmit}
								/>
							</View>
						)}
					</Formik>
				</View>

				<View>
					{otpVisible && (
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
							<View className="flex gap-4 mt-8">
								<CustomButton
									text="Verify OTP"
									buttonFunction={() => router.push("/forget-password")}
								/>
								<CustomButton
									text="Resend OTP"
									buttonFunction={() => console.log("Resend OTP")}
								/>
							</View>
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
