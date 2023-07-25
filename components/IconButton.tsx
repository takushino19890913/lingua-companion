import React, {FC} from 'react';
import { useTailwind } from 'tailwind-rn';
import { TouchableOpacity, GestureResponderEvent } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

type Props = {
    name: any;
    color: string;
    size: number;
    onPress: (e: GestureResponderEvent) => void;
};

export const IconButton:FC<Props> = ({
    color, size, onPress, name
}) => {
    const tailwind = useTailwind();
    return (
        <TouchableOpacity className='items-center' onPress={onPress}>
            <AntDesign name={name} size={size} color={color} />
        </TouchableOpacity>
    )
}