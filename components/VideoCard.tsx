import React, {useState} from "react";
import {View, Text, Image, TouchableOpacity} from "react-native";
import {icons} from "@/constants";

interface Video {
    title: string;
    thumbnail: string;
    video: string;
    creator: Creator;
}

interface Creator {
    username: string;
    avatar: string;
}

interface Props {
    video: Video;
}

const VideoCard = ({ video: {title, creator, thumbnail} } : Props) => {
    const [play, setPlay] = useState(false)

    return (
        <View className="flex-col items-center px-4 mb-14">
            <View className="flex-row gap-3 items-start">
                <View className="justify-center items-center flex-row flex-1">
                    <View className="w-[46px] h-[46px] rounded-lg boder border-secondary justify-center items-center p-0.5">
                        <Image
                            className="w-full h-full rounded-lg"
                            resizeMode="cover"
                            source={{ uri: creator.avatar }}
                        />
                    </View>

                    <View className="justify-center flex-1 ml-3 gap-y-1">
                        <Text className="text-white font-psemibold" numberOfLines={1}>
                            {title}
                        </Text>

                        <Text className="text-xs text-gray-100 font-pregular" numberOfLines={1}>
                            {creator.username}
                        </Text>
                    </View>
                </View>

                <View className="pt-2">
                    <Image
                        className="w-5 h-5"
                        resizeMode="contain"
                        source={icons.menu}
                    />
                </View>
            </View>

            { play ? (
                <Text className="text-white">Playing</Text>
            ) : (
                <TouchableOpacity
                    className="w-full h-60 rounded-xl relative justify-center items-center"
                    activeOpacity={0.7}
                    onPress={() => setPlay(true)}
                >
                    <Image
                        className="w-full h-full rounded-xl mt-3"
                        resizeMode="cover"
                        source={{ uri: thumbnail }}
                    />

                    <Image
                        className="w-12 h-12 absolute"
                        resizeMode="contain"
                        source={icons.play}
                    />
                </TouchableOpacity>
            )}
        </View>
    );
};

export default VideoCard;
