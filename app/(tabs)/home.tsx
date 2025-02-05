import React, { useState } from 'react'
import { FlatList, Image, RefreshControl, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import SearchInput from '@/components/SearchInput'
import Trending from '@/components/Trending'
import EmptyState from "@/components/EmptyState";
import VideoCard from "@/components/VideoCard";
import useAppwrite from "@/hooks/useAppwrite";
import { getAllPosts } from "@/lib/appwrite";
import { images } from '@/constants'

const Home = () => {
  const [refreshing, setRefreshing] = useState(false)

  const { data: posts, refetch } = useAppwrite(getAllPosts);

  console.log(posts);

  const onRefresh = async () => {
      setRefreshing(true)

      await refetch();

      setRefreshing(false)
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList 
        data={posts}
        keyExtractor={(item) => item.$id.toString()}

        renderItem={({item}) => (
          <VideoCard video={item} />
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

              <Trending 
                posts={[ {id: 1}, {id: 2}, {id: 3} ] }
              />
            </View>
          </View>
        )}

        ListEmptyComponent={() => (
            <EmptyState
                title="No Videos Found"
                subtitle="Be the first one to upload a video"
            />
        )}

        refreshControl={
          <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
          />
        }
      />
    </SafeAreaView>
  )
}

export default Home
