import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { fetchAPI } from "@/lib/fetch";
import { useSignUp } from "@clerk/clerk-expo";
import {
    AntDesign,
    MaterialCommunityIcons,
    MaterialIcons,
} from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import ReactNativeModal from "react-native-modal";

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [verificaction, setVefication] = useState({
    state: "default",
    error: "",
    code: "",
  });

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setVefication({
        ...verificaction,
        state: "pending",
      });
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors[0].longMessage);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) return;

    console.log(verificaction);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verificaction.code,
      });

      if (completeSignUp.status === "complete") {
        await fetchAPI("/(api)/user", {
          method: "POST",
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            clerkId: completeSignUp.createdUserId,
          }),
        });
        await setActive({ session: completeSignUp.createdSessionId });
        setVefication({
          ...verificaction,
          state: "success",
        });
      } else {
        setVefication({
          ...verificaction,
          error: "Verification code is invalid",
          state: "failed",
        });
      }
    } catch (err: any) {
      setVefication({
        ...verificaction,
        error: err.errors[0].longMessage,
        state: "failed",
      });
    }
  };

  return (
    <ScrollView className="flex-1 bg-black">
      <View className="flex-1 ">
        <View className="relative w-full h-[90px]">
          <Text className="text-2xl text-white font-JakartaSemiBold absolute bottom-5 left-5">
            Create Your Account
          </Text>
        </View>
        <View className="p-5">
          <InputField
            label="Name"
            placeholder="Enter your name"
            inputStyle="text-[14px] text-white"
            labelStyle="text-[#666]"
            containerStyle="border border-2 border-[#666] text-[#666]"
            placeholderTextColor={"#666"}
            icon={() => (
              <MaterialIcons name="person-outline" size={24} color="#666" />
            )}
            value={form.name}
            onChangeText={(value) => setForm({ ...form, name: value })}
          />

          <InputField
            label="Email"
            placeholder="Enter your email"
            labelStyle="text-[#666]"
            inputStyle="text-[14px] text-white"
            containerStyle="border border-2 border-[#666] text-[#666]"
            placeholderTextColor={"#666"}
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
            inputStyle="text-[14px] text-white"
            labelStyle="text-[#666]"
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
            onPress={onSignUpPress}
            className="mt-6"
          />

          <OAuth />

          <Link
            href="/(auth)/sign-in"
            className="text-lg text-center text-general-200 mt-10"
          >
            <Text className="text-center  mt-5 text-white">
              Already have an account?{` `}
            </Text>
            <Text className="text-tintColor">Sign In</Text>
          </Link>
        </View>

        <ReactNativeModal
          isVisible={verificaction.state === "pending"}
          onModalHide={() => {
            if (verificaction.state === "success") setShowSuccessModal(true);
            // setVefication({ ...verificaction, state: "success" });
          }}
        >
          <View className="bg-black px-7 py-9 rounded-2xl min-h-[300px]">
            <Text className="text-2xl font-JakartaExtraBold mb-2 text-white">
              Verfication
            </Text>
            <Text className="font-Jakarta mb-5 text-white">
              We've sent a verification code to {form.email}
            </Text>
            <InputField
              label="Verification Code"
              placeholder="Enter your verification code"
              inputStyle="text-[14px] text-white"
              labelStyle="text-[#666]"
              placeholderTextColor={"#666"}
              containerStyle="border border-2 border-[#666] text-[#666]"
              icon={() => (
                <MaterialIcons name="lock-outline" size={24} color="#666" />
              )}
              value={verificaction.code}
              keyboardType="numeric"
              onChangeText={(value) =>
                setVefication({ ...verificaction, code: value })
              }
            />
            {verificaction.error && (
              <Text className="text-[#dc2626] text-sm mt-1">
                {verificaction.error}
              </Text>
            )}

            <CustomButton
              title="Verify"
              onPress={onPressVerify}
              className="mt-5 bg-success-500"
            />
          </View>
        </ReactNativeModal>

        <ReactNativeModal isVisible={showSuccessModal}>
          <View className="bg-black px-7 py-9  rounded-2xl min-h-[300px]">
            <View className="mx-auto my-5">
              <AntDesign name="checkcircle" size={100} color="green" />
            </View>
            <Text className="text-3xl font-JakartaBold text-center text-white">
              Verified
            </Text>

            <Text className="text-base text-white/70 font-Jakarta text-center mt-2">
              You have successfully verified your email address
            </Text>
            <CustomButton
              title="Browser Home"
              onPress={() => {
                setShowSuccessModal(false);
                router.replace("/(tabs)/");
              }}
              className="mt-5"
            />
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  );
};

export default SignUp;
