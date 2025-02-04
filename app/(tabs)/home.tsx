import React from 'react'
import { FlatList, Image, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import SearchInput from '@/components/SearchInput'
import { images } from '@/constants'

const Home = () => {
  return (
    <SafeAreaView className="bg-primary">
      <FlatList 
        data={[1,2,3, 4, 5, 6, 7, 8, 9, 10]}
        keyExtractor={(item) => item.toString()}
        renderItem={({item}) => (
          <Text className="text-3xl text-white">{item}</Text>
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>

                <Text className="text-2xl font-psemibold text-white">
                  JSMastery
                </Text>
              </View>

              <View className="mt-1.5">
                <Image 
                  className="w-9 h-10"
                  resizeMode="contain"
                  source={images.logoSmall} 
                />
              </View>
            </View>

            <SearchInput
              placeholder="Search for a video topic..."
            />

            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-lg mb-3 font-pregular text-gray-100">
                Latest Videos
              </Text>


            </View>
          </View>
        )}
      />
    </SafeAreaView>
  )
}

export default Home