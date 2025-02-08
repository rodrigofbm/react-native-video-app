import React, {useState} from 'react'
import {FlatList, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {useVideoPlayer, VideoView} from "expo-video";
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
const videoSource =
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

const TrendingItem = ({activeItem, item}) => {
    const [play, setPlay] = useState(false)
    const player = useVideoPlayer(videoSource, (player) => {
        player.showNowPlayingNotification = true;
    });
    return  (
        <Animatable.View
            className="mr-5"
            animation={activeItem === item.$id ? zoomIn : zoomOut}
            duration={500}
        >
            {
                play ? (
                    <View
                        className="w-52 h-72 rounded-[35px] mt-3 bg-white/10"
                        style={styles.contentContainer}
                    >
                        <VideoView
                            style={{width: '100%', height: '100%'}}
                            player={player}
                            allowsFullscreen
                            allowsPictureInPicture
                            nativeControls
                        />
                    </View>
                ) :
                (
                    <TouchableOpacity
                        className="relative justify-center items-center"
                        activeOpacity={0.7}
                        onPress={() => {
                            setPlay(true);
                            player.play()
                        }}
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
        showsHorizontalScrollIndicator={false}
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

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
