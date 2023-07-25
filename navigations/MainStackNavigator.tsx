import React, {FC} from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types/types'
import { StartScreen } from '../screens/StartScrren'

const Stack = createNativeStackNavigator<RootStackParamList>();

export const MainStackNavigator:FC = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Start" component={StartScreen} />
        </Stack.Navigator>
    )
}