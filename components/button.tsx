import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

type buttonProps = {
    text : string,
    buttonStyle ?: string
    textStyle ?: string
    buttonFunction ?: () => void
}

const CustomButton = (props : buttonProps) => {
    return (
        <TouchableOpacity
            className={props.buttonStyle ??  "w-[300px] h-10 flex items-center justify-center rounded-md bg-[#cbcbcb]"}
            onPress={props.buttonFunction}
        >
            <Text
                className={props.textStyle ?? "text-lg font-psemibold text-black"}
            >
                {props.text}
            </Text>
        </TouchableOpacity>
    );
}

export default CustomButton;
