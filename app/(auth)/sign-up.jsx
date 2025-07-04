import { View, Text, ScrollView, TextInput, KeyboardAvoidingView, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router';
import axios from 'axios';
import env from "../env";
import CustomButton from '../../components/button'
import { Formik } from 'formik'
import { signUpFormInitialValues } from '../../constants/formConstants'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { signUpValidationschema } from '../../utils/app3/FormValidation'

const SignUp = () => {
	const router = useRouter();
	
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
	const InputStyle = 'bg-[#cbcbcb]/30 h-[40px] border border-[#898989] rounded-lg pl-4'

	return (
		<KeyboardAvoidingView
			    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				contentContainerStyle={{flexGrow : 1}}
		>
			<ScrollView contentContainerStyle={{flexGrow:1}}>
				<SafeAreaView className='flex-1 flex-row justify-center items-center bg-white'>
					<View className='flex-1 flex-col justify-center items-center'>
						<Text className='text-black font-psemibold text-[25px]'>
							SIGN UP
						</Text>
						
						<Formik
							initialValues={signUpFormInitialValues}
							validationSchema={toFormikValidationSchema(signUpValidationschema)}
							onSubmit={(values, {resetForm}) => {
								console.log(values)
								resetForm()
							}}
						>
							{({handleSubmit, values, handleChange, errors, touched}) => (
								<View>
									<View>
										<Text className={Textstyle}>Username : </Text>
										<TextInput
											className={InputStyle}
											value={values.user_name}
											placeholder='Username'
											onChangeText={handleChange('user_name')}
										/>
										{errors.user_name && touched.user_name && <Text className="text-red-500 mt-1">{errors.user_name}</Text>}
									</View>
									<View>
										<Text className={Textstyle}>Email Id : </Text>
										<TextInput
											className={InputStyle}
											value={values.email_id}
											placeholder='Email'
											onChangeText={handleChange('email_id')}
										/>
										{errors.email_id && touched.email_id && <Text className="text-red-500 mt-1">{errors.email_id}</Text>}
									</View>
									<View>
										<Text className={Textstyle}>Phone Number : </Text>
										<TextInput
											className={InputStyle}
											value={values.phone_number}
											placeholder='Phone number'
											onChangeText={handleChange('phone_number')}
										/>
										{errors.phone_number && touched.phone_number && <Text className="text-red-500 mt-1">{errors.phone_number}</Text>}
									</View>
									<View>
										<Text className={Textstyle}>Password : </Text>
										<TextInput
											className={InputStyle}
											value={values.password}
											placeholder='Password'
											onChangeText={handleChange('password')}
										/>
										{errors.password && touched.password && <Text className="text-red-500 mt-1">{errors.password}</Text>}
									</View>
									<View>
										<Text className={Textstyle}>Confirm Password : </Text>
										<TextInput
											className={InputStyle}
											value={values.cpassword}
											placeholder='Re-type Password'
											onChangeText={handleChange('cpassword')}
										/>
										{errors.cpassword && touched.cpassword && <Text className="text-red-500 mt-1">{errors.cpassword}</Text>}
									</View>
									<CustomButton
										text='Sign Up'
										buttonFunction={handleSubmit}
										buttonStyle='bg-[#898989] h-[40px] w-[300px] justify-center rounded-[10px] mt-8'
										textStyle='text-center text-xl text-black'
									/>
								</View>
							)}
						</Formik>
						<View className='m-2'>
							<Text className='font-psemibold text-center mt-4 text-black'>
								Already Signed In ? {'\n'}
							</Text>
							<CustomButton
								text='Sign In'
								buttonFunction={() => router.push('/sign-in')}
							/>
						</View>
					</View>
				</SafeAreaView>
			</ScrollView>
		</KeyboardAvoidingView>
	)
}

export default SignUp