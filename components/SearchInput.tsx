import React from 'react'
import { View, TextInput, TouchableOpacity, Image } from 'react-native'

import { icons } from '@/constants';

type Props = {
    title: string;
    value: string;
    placeholder?: string;
    otherStyles?: string;
    keyboardType?: string;
    handleChangeText: (e: string) => void;
}

const SearchInput = ({ title, value, placeholder, handleChangeText, otherStyles, ...props }: Props) => {
    return (
        <View className="focus:border-secondary border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl items-center flex-row space-x-4">
            <TextInput 
                className="flex-1 mt-0.5 text-white font-pregular text-base"
                value={value}
                placeholder={placeholder}
                placeholderTextColor="#7b7b8b"
                onChangeText={handleChangeText}
            />

                <TouchableOpacity 
                    className="text-secondary font-psemibold"
                >
                    <Image 
                        className="w-5 h-5"
                        resizeMode="contain"
                        source={ icons.search } 
                    />
                </TouchableOpacity>
        </View>
    )
}

export default SearchInput