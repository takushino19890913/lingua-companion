import React, {FC} from 'react';
import {useTailwind} from 'tailwind-rn';
import { TouchableOpacity, Text, GestureResponderEvent} from 'react-native';

type Props = {
    title: string;
    bgColor?: string;
    titleColor?: string;
    onPress: (e: GestureResponderEvent) => void;
};

export const Button:FC<Props> = ({
    title,
    bgColor = "bg-gray-500",
    titleColor = "text-white",
    onPress,
}) =>{
    const tailwind = useTailwind();
    return(
        <TouchableOpacity
className={`mb-4 mx-3 rounded-3xl w-11/12 ${bgColor}`}
onPress={onPress}
>
    <Text className={`text-center text-lg font-semibold p2 ${titleColor}`}>
        {title}
    </Text>
</TouchableOpacity>
    )

}
 