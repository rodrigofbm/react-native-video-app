import React, {useState} from 'react'
import {View, TextInput, TouchableOpacity, Image, Alert} from 'react-native'
import {router, usePathname} from "expo-router";

import {icons} from '@/constants';

type Props = {
    placeholder?: string,
    initialQuery?: string | string[]
}

const SearchInput = ({placeholder, initialQuery}: Props) => {
    const pathname = usePathname()
    const [query, setQuery] = useState(initialQuery || '')

    return (
        <View
            className="focus:border-secondary border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl items-center flex-row space-x-4">
            <TextInput
                className="flex-1 mt-0.5 text-white font-pregular text-base"
                value={query}
                placeholder={placeholder}
                placeholderTextColor="#CDCDE0"
                onChangeText={(e) => setQuery(e)}
            />

            <TouchableOpacity
                className="text-secondary font-psemibold"
                onPress={() => {
                    if (!query) return Alert.alert('Missing query', 'Please enter a query')

                    if (pathname.startsWith('/search')) router.setParams({query})
                    else router.push(`/search/${query}`)
                }}
            >
                <Image
                    className="w-5 h-5"
                    resizeMode="contain"
                    source={icons.search}
                />
            </TouchableOpacity>
        </View>
    )
}

export default SearchInput
