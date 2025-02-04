import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { icons } from '@/constants';

type Props = {
    title: string;
    value: string;
    placeholder?: string;
    handleChangeText: (e: string) => void;
    otherStyles?: string;
    keyboardType?: string;
}

const SearchInput = ({ title, value, placeholder, handleChangeText, otherStyles, ...props }: Props) => {
    const [showPassword, setShowPassword] = React.useState(false)

  return (
    <View className="focus:border-secondary border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl items-center flex-row space-x-4">
        <TextInput 
            className="flex-1 mt-0.5 text-white font-pregular text-base"
            value={value}
            placeholder={placeholder}
            placeholderTextColor="#7b7b8b"
            onChangeText={handleChangeText}
            secureTextEntry={title === 'Password' && !showPassword}
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