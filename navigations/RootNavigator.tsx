import React, {FC} from 'react'
import {useTailwind} from 'tailwind-rn';
import { SafeAreaView, ActivityIndicator } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { AuthStackNavigator } from './AuthStackNavigator';
import { MainStackNavigator } from './MainStackNavigator';
import { useAuthState } from '../hooks/useAuthState';

export const RootNavigator: FC = () => {
    //常にUserのログイン状態を監視する事ができる。
    const {user, isLoading} = useAuthState();
    const tailwind = useTailwind();

    if(isLoading){
        return (
            <SafeAreaView className="flex-1 items-center justify-center">
                <ActivityIndicator size="large" color="gray" />
            </SafeAreaView>
        )
    }

    return (
        <NavigationContainer>
            {user?.uid ? <MainStackNavigator /> : <AuthStackNavigator />}
        </NavigationContainer>
    )
}