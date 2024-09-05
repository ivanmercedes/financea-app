import { DollarIcon, WalletCardIcon } from "@/constants/icons";
import { IncomeType } from "@/types";
import { Feather } from "@expo/vector-icons";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

const IncomeBlock = ({ incomeList }: { incomeList: IncomeType[] }) => {
  const renderItem = ({ item }: { item: IncomeType }) => {
    let Icon = <DollarIcon width={18} height={18} color="white" />;

    if (item.name === "Freelancing") {
      Icon = <Feather name="briefcase" size={18} color="white" />;
    }

    if (item.name === "Interest") {
      Icon = <WalletCardIcon width={18} height={18} color="white" />;
    }

    let amount = item.amount.split(".");
    return (
      <View className="bg-gray p-3 rounded-xl mr-5 w-32">
        <View className="flex flex-row justify-between mb-2">
          <View className="border rounded-xl p-1 border-[#666] self-start">
            {Icon}
          </View>
          <TouchableOpacity onPress={() => {}}>
            <Feather name="more-vertical" size={20} color="white" />
          </TouchableOpacity>
        </View>
        <Text className="text-white text-sm">{item.name}</Text>
        <Text className="text-white text-sm font-semibold mt-2">
          ${amount?.[0]}.
          <Text className="font-normal text-xs">{amount?.[1]}</Text>
        </Text>
      </View>
    );
  };

  return (
    <View>
      <Text className="text-white text-base my-5">
        My <Text className="font-bold">Income</Text>
      </Text>
      <FlatList
        data={incomeList}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default IncomeBlock;
