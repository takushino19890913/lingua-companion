import React, {FC} from 'react';
import { useTailwind } from 'tailwind-rn';
import { View, Text } from 'react-native';

type Props = {
    first: string;
    last: string;
    borderColor?: string
    textColor?: string
}

export const Title:FC<Props> = ({
    first, last, borderColor="#5f9ea0", textColor="#5f9ea0"
}) => {
    const tailwind = useTailwind();
    return(
        <View className='flex-row my-6 px-1'>
            <View 
              className='flex-1 mr-1 border self-center '
              style={{borderColor:borderColor}}
            />
            <Text style={tailwind('')}>
                {`${first}`}
                <Text className="font-light" style={{color: textColor}}>{last}</Text>
            </Text>
            <View 
              className='flex-1 ml-1 border self-center '
              style={{borderColor:borderColor}}
            />
        </View>
    )
}