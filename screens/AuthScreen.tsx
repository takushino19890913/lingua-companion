import React, {FC} from 'react';
import {useTailwind} from 'tailwind-rn';
import {Text, SafeAreaView} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import { useFirebaseAuth } from '../hooks/useFirebaseAuth';
import { Button } from '../components/Button';
import { InputField } from '../components/InputField';
import { IconButton } from '../components/IconButton';

export const AuthScreen:FC = () => {
    const {
        isLogin,
        email,
        password,
        authErr,
        login,
        register,
        setEmail,
        setPassword,
        toggleMode,
    } = useFirebaseAuth();

    const tailwind = useTailwind();

    return(
        <SafeAreaView 
         className='flex-1 h-full pt-16 justify-center items-center'
         style={{backgroundColor:'#008b8b'}}
        >
            <FontAwesome name="tasks" size={50} color="white" />
            <Text className='text-2xl text-white font-semibold mt-2 mb-5'>
                {isLogin ? 'Login' : 'SignUp'}
            </Text>
            <InputField
                leftIcon="email"
                placeholder='Enter email'
                keyboardType='email-address'
                textContentType='emailAddress'
                autoFocus
                value={email}
                onChangeText={(text: string) => setEmail(text)}
            />
            <InputField
                leftIcon="lock"
                placeholder='Enter password'
                secureTextEntry
                textContentType='password'
                value={password}
                onChangeText={(text: string) => setPassword(text)}
            />
            {
                authErr !== '' && (
                    <Text className='text-yellow-300 my-3 font-semibold'>{authErr}</Text>
                )
            }
            <Button
                onPress={isLogin ? login: register}
                title={isLogin ? 'Login' : 'Register'}
            />
            <Text className='text-white mb-3 text-base'>
                {isLogin ? "Create new account?" : "Login?"}
            </Text>
            <IconButton name="retweet" size={24} color="#fff" onPress={toggleMode} />
        </SafeAreaView>
    )
}