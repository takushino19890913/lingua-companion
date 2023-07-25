import React, {FC} from 'react';
import { useTailwind } from 'tailwind-rn';
import { View, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Props = {
    leftIcon: any;
    iconColor?: string;
    placeholder: string;
    placeholderTextColor?: string;
    secureTextEntry?: boolean | undefined;
    keyboardType?: 'email-address' | 'default';
    textContentType?: 'emailAddress' | 'password' | 'name';
    autoFocus?: boolean | undefined;
    value: string;
    onChangeText: (text:string) => void
};

export const InputField:FC<Props> = ({
    leftIcon,
    iconColor = 'gray',
    placeholderTextColor ='gray',
    placeholder,
    secureTextEntry = false,
    keyboardType = 'default',
    textContentType = 'name',
    autoFocus = false,
    value,
    onChangeText,
}) => {
    const tailwind = useTailwind();
    return(
        <View
        className='mb-5 mx-3 flex-row p-3 w-11/12 bg-white rounded'
        >
            {
                leftIcon && (
                    <MaterialCommunityIcons 
                        name={leftIcon}
                        size={20}
                        color={iconColor}
                        style={{marginRight:10}}
                    />
                )
            }
            <TextInput 
                className="w-full"
                onChangeText={onChangeText}
                value={value}
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}
                textContentType={textContentType}
                autoCapitalize="none"
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor}
            />
        </View>
    )
}