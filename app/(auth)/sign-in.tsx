import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { useSignIn } from "@clerk/clerk-expo";
import {
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView, Text, View } from "react-native";

const SignIn = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        // TODO: Handle error
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, form.email, form.password]);

  return (
    <ScrollView className="flex-1 bg-black">
      <View className="flex-1 ">
        <View className="relative w-full h-[150px] bg-black">
          <Text className="text-2xl text-white font-JakartaSemiBold absolute bottom-5 left-5">
            Welcome
          </Text>
        </View>
        <View className="p-5">
          <InputField
            label="Email"
            labelStyle="text-[#666]"
            inputStyle="text-[14px] text-white"
            containerStyle="border border-2 border-[#666] text-[#666]"
            placeholderTextColor={"#666"}
            placeholder="Enter your email"
            icon={() => (
              <MaterialCommunityIcons
                name="email-outline"
                size={24}
                color="#666"
              />
            )}
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />

          <InputField
            label="Password"
            placeholder="Enter your password"
            labelStyle="text-[#666]"
            inputStyle="text-[14px] text-white"
            containerStyle="border border-2 border-[#666] text-[#666]"
            placeholderTextColor={"#666"}
            icon={() => (
              <MaterialIcons name="lock-outline" size={24} color="#666" />
            )}
            secureTextEntry={true}
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />
          <CustomButton
            title="Sign Up"
            onPress={onSignInPress}
            className="mt-6"
          />

          <OAuth />

          <Link
            href="/(auth)/sign-up"
            className="text-lg text-center text-general-200 mt-10"
          >
            <Text className="text-center  mt-5 text-white">
              Don't have an account?{` `}
            </Text>
            <Text className="text-tintColor">Sign In</Text>
          </Link>
        </View>
        {/* verificaction modal */}
      </View>
    </ScrollView>
  );
};

export default SignIn;
