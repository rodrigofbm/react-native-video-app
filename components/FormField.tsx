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

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, ...props }: Props) => {
    const [showPassword, setShowPassword] = React.useState(false)

  return (
    <View className={`space-y-2 ${otherStyles}`}>
        <Text className="text-base text-gray-100 font-pmedium">
            {title}
        </Text>

        <View className="focus:border-secondary border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl items-center flex-row">
            <TextInput 
                className="flex-1 text-white font-psemibold text-base"
                value={value}
                placeholder={placeholder}
                placeholderTextColor="#7b7b8b"
                onChangeText={handleChangeText}
                secureTextEntry={title === 'Password' && !showPassword}
            />

            {
                title === 'Password' && 
                <TouchableOpacity 
                    onPress={() => setShowPassword((!showPassword))}
                    className="text-secondary font-psemibold"
                >
                    <Image 
                        className="w-6 h-6"
                        resizeMode="contain"
                        source={ showPassword ? icons.eye : icons.eyeHide } 
                    />
                </TouchableOpacity>
            }
        </View>
    </View>
  )
}

export default FormField