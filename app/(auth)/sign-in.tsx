import React from 'react'
import { Alert, Image, ScrollView, Text, View } from 'react-native'
import { Link, router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { images } from '@/constants'
import { signIn } from '@/lib/appwrite'

const SignIn = () => {
  const [form, setForm] = React.useState({email: '', password: ''});
  const [isLoading, setIsLoading] = React.useState(false)

  const submit = async () => {
      if(!form.email || !form.password) Alert.alert('Error','All fields are required');
  
      setIsLoading(true);
  
      try {
        const result = await signIn(form.email, form.password);
  
        //set it to global state
  
        router.push('/home');
      } catch (error: any) {
        Alert.alert(error.message);
      } finally {
        setIsLoading(false);
      }
    }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full min-h-[85vh] justify-center px-4 my-6">
          <Image
            source={images.logo} 
            resizeMode='contain'
            className="w-[135px] h-[35px]"
          />

          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            Log in to Aora
          </Text>

          <FormField 
            title="Email Address" 
            value={form.email}
            handleChangeText={(e: string) => setForm({...form, email: e})}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField 
            title="Password" 
            value={form.password}
            handleChangeText={(e: string) => setForm({...form, password: e})}
            otherStyles="mt-7"
          />

          <CustomButton 
            title="Log in" 
            handlePress={submit}
            containerStyles='mt-10'
            isLoading={isLoading}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text 
              className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link href="/sign-up" className="text-lg font-psemibold text-secondary">
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn