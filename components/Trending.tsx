import React from 'react'
import { View, Text, FlatList } from 'react-native'

interface Props {
    posts: any[]
}

const Trending = ({ posts }: Props) => {
  return (
    <FlatList 
        horizontal
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
            <Text className="text-3xl text-white">
                {item.id}
            </Text>
        )}
    />
  )
}

export default Trending