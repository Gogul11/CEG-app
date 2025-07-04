import { View, Text, TextInput, Alert, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import env from "../env";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomButton from "../../components/button";
import { Formik } from "formik";
import { forgotPasswordInitialValues } from "../../constants/formConstants";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { forgotPasswordSchema } from "../../utils/app3/FormValidation";

const ChangePassword = () => {

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

    return (
        <SafeAreaView className='flex-1 justify-center items-center bg-white'>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <Formik
                        initialValues={forgotPasswordInitialValues}
                        validationSchema={toFormikValidationSchema(forgotPasswordSchema)}
                        onSubmit={(values) => {
                            console.log(values)
                        }}
                    >
                        {({handleSubmit, values, handleChange, errors, touched}) => (
                            <View className="flex gap-4">
                                <View>
                                    <Text className='text-[16px] my-2 text-[#898989] font-pmedium'>New Password</Text>
                                    <TextInput
                                        className="bg-[#cbcbcb]/30 h-[40px] border border-[#898989] rounded-lg pl-4"
                                        value={values.new_password}
                                        onChangeText={handleChange('new_password')}
                                        placeholder="New Password"
                                    />
                                    {errors.new_password && touched.new_password && <Text className="text-red-500 mt-1">{errors.new_password}</Text>}
                                </View>
                                <View>
                                    <Text className='text-[16px] my-2 text-[#898989] font-pmedium'>Confirm Password</Text>
                                    <TextInput
                                        className="bg-[#cbcbcb]/30 h-[40px] border-[1px] border-[#898989] rounded-lg pl-4"
                                        value={values.conf_password}
                                        onChangeText={handleChange('conf_password')}
                                        placeholder="Re-type Password"
                                    />
                                    {errors.conf_password && touched.conf_password && <Text className="text-red-500 mt-1">{errors.conf_password}</Text>}
                                </View>
                                <View className="mt-8">
                                    <CustomButton
                                        text="Change Password"
                                        buttonFunction={handleSubmit}
                                    />
                                </View>
                            </View>
                        )}
                    </Formik>
            </ScrollView>
        </SafeAreaView>
    );
};


export default ChangePassword;
