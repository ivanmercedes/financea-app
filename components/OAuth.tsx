import { useOAuth } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { Alert, Text, View } from "react-native";

import CustomButton from "@/components/CustomButton";
import { googleOAuth } from "@/lib/auth";
import { AntDesign } from "@expo/vector-icons";

const OAuth = () => {
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const handleGoogleSignIn = async () => {
    const result = await googleOAuth(startOAuthFlow);

    if (result.code === "session_exists" || result.code === "success") {
      router.replace("/(tabs)/");
    }

    Alert.alert(result.success ? "Success" : "Error", result.message);
  };

  return (
    <View>
      <View className="flex flex-row justify-center items-center mt-4 gap-x-3">
        <View className="flex-1 h-[1px] bg-general-100" />
        <Text className="text-lg text-white">Or</Text>
        <View className="flex-1 h-[1px] bg-general-100" />
      </View>

      <CustomButton
        title="Log In with Google"
        className="mt-5 w-full shadow-none"
        IconLeft={() => <AntDesign name="google" size={22} color="white" />}
        bgVariant="outline"
        onPress={handleGoogleSignIn}
      />
    </View>
  );
};

export default OAuth;
