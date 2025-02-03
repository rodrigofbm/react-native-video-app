import { Alert, Image, ScrollView, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { Link, router } from 'expo-router'
import { createUser } from '@/lib/appwrite'


const SignUp = () => {
  const [form, setForm] = React.useState({username: '', email: '', password: ''});
  const [isLoading, setIsLoading] = React.useState(false)

  const submit = async () => {
    if(!form.username || !form.email || !form.password) Alert.alert('Error','All fields are required');

    setIsLoading(true);

    try {
      const result = await createUser(form.email, form.password, form.username);

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
            Sign up to Aora
          </Text>

          <FormField 
            title="Username" 
            value={form.username}
            handleChangeText={(e: string) => setForm({...form, username: e})}
            otherStyles="mt-10"
          />

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
            title="Sign up" 
            handlePress={submit}
            containerStyles='mt-10'
            isLoading={isLoading}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text 
              className="text-lg text-gray-100 font-pregular">
              Have an account already?
            </Text>
            <Link href="/sign-in" className="text-lg font-psemibold text-secondary">
              Log In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp