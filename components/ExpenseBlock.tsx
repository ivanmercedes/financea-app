import Colors from "@/constants/Colors";
import { ExpenseType } from "@/types";
import { Feather } from "@expo/vector-icons";
import {
  FlatList,
  ListRenderItem,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ExpenseBlcok = ({ ExpenseList }: { ExpenseList: ExpenseType[] }) => {
  const renderItem: ListRenderItem<Partial<ExpenseType>> = ({
    item,
    index,
  }) => {
    if (index === 0) {
      return (
        <TouchableOpacity onPress={() => {}} className="">
          <View className="flex-1 rounded-md border-2 border-[#666] border-dashed mr-7 justify-center items-center p-10">
            <Feather name="plus" size={24} color="#ccc" />
          </View>
        </TouchableOpacity>
      );
    }
    let amount = item.amount?.split(".");
    return (
      <View
        style={{
          backgroundColor:
            item.name === "Food"
              ? Colors.blue
              : item.name === "Saving"
              ? Colors.white
              : item.name === "Transport"
              ? "#FFA5BA"
              : Colors.tintColor,
        }}
        className="w-[110px] p-4 rounded-xl mr-5 space-y-2  justify-between items-start"
      >
        <Text
          style={{
            color:
              item.name === "Food"
                ? Colors.black
                : item.name === "Saving"
                ? Colors.black
                : Colors.white,
          }}
          className=" text-sm"
        >
          {item.name}
        </Text>
        <Text
          style={{
            color:
              item.name === "Food"
                ? Colors.black
                : item.name === "Saving"
                ? Colors.black
                : Colors.white,
          }}
          className=" text-base font-semibold"
        >
          ${amount?.[0] ?? "0"}.
          <Text className="text-xs font-sm mt-5">{amount?.[1] ?? "00"}</Text>
        </Text>

        <View
          style={{
            backgroundColor: "rgba(255,255,255,0.22)",
          }}
          className={` px-2 py-2 rounded-full`}
        >
          <Text
            style={{
              color:
                item.name === "Food"
                  ? Colors.black
                  : item.name === "Saving"
                  ? Colors.black
                  : Colors.white,
            }}
            className=" text-xs"
          >
            {item.percentage}%
          </Text>
        </View>
      </View>
    );
  };
  const staticItem = [
    {
      name: "Add Item",
    },
  ];
  return (
    <View>
      <FlatList
        data={staticItem.concat(ExpenseList)}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default ExpenseBlcok;
