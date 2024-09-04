import { ScrollView, Text, View } from "react-native";

const page = () => {
  return (
    <View className="flex-1 bg-black pt-3 px-5">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex flex-row justify-between items-center">
          <View className="gap-2">
            <Text className="text-white text-base">
              My <Text className="font-bold">Expenses</Text>
            </Text>
            <Text className="text-2xl text-white font-bold">
              $2700.<Text className="font-normal text-lg">00</Text>
            </Text>
          </View>
          <View>
            <Text className="text-white">Pie chart</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default page;
