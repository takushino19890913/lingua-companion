import React from 'react';
import {View, Text, Alert, SafeAreaView} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { auth } from '../firebaseConfig'
import { selectUser, logout } from '../slices/userSlice';
import { IconButton } from '../components/IconButton';

export const StartScreen = () => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const signOut = async () => {
        try{
            await auth.signOut();
            dispatch(logout());
        } catch{
            Alert.alert("Logout error");
        }
    };
    return (
        <SafeAreaView className='flex-1 justify-center mt-5 items-center' >
            <Text>{user.email}</Text>
            <IconButton name="logout" size={20} color="blue" onPress={signOut} />
        </SafeAreaView>
    )
}