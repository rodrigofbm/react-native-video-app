import React from 'react'
import {Image, Text, View} from 'react-native'
import {router} from "expo-router";

import CustomButton from "@/components/CustomButton";
import {images} from "@/constants";

interface Props {
    title: string;
    subtitle: string;
}

const EmptyState = ({ title, subtitle }: Props) => {
    return (
        <View className="justify-center items-center px-4">
            <Image
                className="w-[270px] h-[215px]"
                source={images.empty}
                resizeMode="contain"
            />

            <Text className="text-xl text-center font-psemibold text-white mt-2">
                {title}
            </Text>

            <Text className="font-pmedium text-sm text-gray-100">
                {subtitle}
            </Text>

            <CustomButton
                containerStyles="w-full my-5"
                title="Create video"
                handlePress={() => router.push("/create")}
            />
        </View>
    )
}

export default EmptyState
