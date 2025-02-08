import React, {useState} from 'react'
import {Text, FlatList, TouchableOpacity, ImageBackground, Image} from 'react-native'
import * as Animatable from 'react-native-animatable'
import {icons} from "@/constants";

const zoomIn = {
    0: { scale: 0.9 },
    1: { scale: 1.0 },
}

const zoomOut = {
    0: { scale: 1.0 },
    1: { scale: 0.9 },
}

const TrendingItem = ({activeItem, item}) => {
    const [play, setPlay] = useState(false)

    return  (

        <Animatable.View
            className="mr-5"
            animation={activeItem === item.$id ? zoomIn : zoomOut}
            duration={500}
        >
            {
                play ? (
                    <Text className="text-white">Playing</Text>
                ) :
                (
                    <TouchableOpacity
                        className="relative justify-center items-center"
                        activeOpacity={0.7}
                        onPress={() => setPlay(true)}
                    >
                        <ImageBackground
                            className="w-52 h-72 rounded-[32px] my-5 overflow-hidden shadow-lg shadow-black/40"
                            source={{uri: item.thumbnail}}
                            resizeMode="cover"
                        />

                        <Image
                            className="w-12 h-12 absolute"
                            resizeMode="contain"
                            source={icons.play}
                        />
                    </TouchableOpacity>
                )
            }
        </Animatable.View>
    )
}

interface Props {
    posts: any[]
}

const Trending = ({ posts }: Props) => {
    const [activeItem, setActiveItem] = useState(posts[1])

    const viewableItemsChanged = ({ viewableItems }) => {
        if(viewableItems.length > 0) {
            setActiveItem(viewableItems[0].key)
        }
    }

    return (
    <FlatList 
        horizontal
        data={posts}
        keyExtractor={(item) => item.$id}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={{itemVisiblePercentThreshold: 70}}
        contentOffset={{ x: 140, y: 0 }}
        renderItem={({item}) => (
            <TrendingItem
                activeItem={activeItem}
                item={item}
            />
        )}
    />
  )
}

export default Trending
