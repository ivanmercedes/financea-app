import { Image, Text, TouchableOpacity, View } from "react-native";

const Header = () => {
  return (
    <View className="bg-black flex flex-row justify-between items-center px-5 h-20">
      <View className="flex flex-row items-center gap-2">
        <Image
          source={{
            uri: "https://i.pravatar.cc/250?u=17",
          }}
          className="w-12 h-12 rounded-full"
        />
        <View>
          <Text className="text-white text-xs">Hi, Ivan</Text>
          <Text className="text-white text-sm">Your <Text className="font-semibold">Budget</Text></Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {}}
        className="rounded-2xl border border-1 p-2 border-[#666]"
      >
        <Text className="text-white text-xs">My transactions</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;
