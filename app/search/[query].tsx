import React, {useEffect, useState} from 'react'
import {FlatList, Image, RefreshControl, Text, View} from 'react-native'
import {useLocalSearchParams} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";
import useAppwrite from "@/hooks/useAppwrite";
import {getAllPosts, getLatestPosts, searchPosts} from "@/lib/appwrite";
import VideoCard from "@/components/VideoCard";
import {images} from "@/constants";
import SearchInput from "@/components/SearchInput";
import Trending from "@/components/Trending";
import EmptyState from "@/components/EmptyState";

const Search = () => {
    const {query} = useLocalSearchParams()
    const { data: posts, refetch } = useAppwrite(() => searchPosts(query));

    useEffect(() => {
        refetch();
    }, [query]);

    return (
        <SafeAreaView className="bg-primary h-full">
            <FlatList
                data={posts}
                keyExtractor={(item) => item.$id.toString()}

                renderItem={({item}) => (
                    <VideoCard video={item} />
                )}

                ListHeaderComponent={() => (
                    <View className="my-6 px-4">
                        <Text className="font-pmedium text-sm text-gray-100">
                            Search Results
                        </Text>

                        <Text className="text-2xl font-psemibold text-white">
                            {query}
                        </Text>

                        <View className="mt-6 mb-8">
                            <SearchInput
                                initialQuery={query}
                                placeholder="Search for a video topic..."
                            />
                        </View>
                    </View>
                )}

                ListEmptyComponent={() => (
                    <EmptyState
                        title="Oops!"
                        subtitle="No videos found..."
                    />
                )}
            />
        </SafeAreaView>
    )
}

export default Search
