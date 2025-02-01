import { StatusBar, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const RootLayout = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className='text-3xl'>RootLayout</Text>
      <StatusBar barStyle="default" />
      <Link href="/profile" style={{ color: 'blue' }}>Go to profile</Link>
    </View>
  )
}

export default RootLayout