import Colors from "@/constants/Colors";
import { AirbnbIcon, AmazonIcon, DollarIcon, FigmaIcon, NetflixIcon, ShoopingCartIcon, SpotifyIcon } from "@/constants/icons";
import { SpendingType } from "@/types";
import { Text, View } from "react-native";

const SpendingBlock = ({ spendingList }: { spendingList: SpendingType[] }) => {
  let icon = <DollarIcon width={18} height={18} color="white" />;
  return (
    <View className="my-5 items-start pb-20">
      <Text className="text-white text-base my-5">
        September <Text className="font-bold">Spending</Text>
      </Text>

      {spendingList.map((item, index) => {
        if (item.name == "AirBnB Rent") {
          icon = <AirbnbIcon width={22} height={22} color={Colors.white} />;
        } else if (item.name == "Netflix") {
          icon = <NetflixIcon width={22} height={22} color={Colors.white} />;
        } else if (item.name == "Spotify") {
          icon = <SpotifyIcon width={22} height={22} color={Colors.white} />;
        } else if (item.name == "Amazon") {
          icon = <AmazonIcon width={22} height={22} color={Colors.white} />;
        } else if (item.name == "Figma") {
          icon = <FigmaIcon width={22} height={22} color={Colors.white} />;
        } else if (item.name == "Online Shopping") {
          icon = (
            <ShoopingCartIcon width={22} height={22} color={Colors.white} />
          );
        }

        return (
          <View key={item.id} className="flex flex-row items-center my-2">
            <View className="bg-gray p-4 rounded-xl mr-3">{icon}</View>
            <View className="flex flex-row justify-between items-center flex-1 ">
              <View className="gap-1">
                <Text className="text-white">{item.name}</Text>
                <Text className="text-white">{item.date}</Text>
              </View>
              <Text className="text-white">${item.amount}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default SpendingBlock;
