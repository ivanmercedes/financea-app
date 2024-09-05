import ExpenseBlcok from "@/components/ExpenseBlock";
import IncomeBlock from "@/components/IncomeBlock";
import Colors from "@/constants/Colors";
import ExpenseList from '@/data/expenses.json';
import incomeList from '@/data/income.json';
import { ScrollView, Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";

const page = () => {

  const pieData = [
    {
      value: 47,
      color: Colors.tintColor,
      focused: true,
      text: "47%",
    },
    {
      value: 40,
      color: Colors.blue,
      text: "40%",
    },
    {
      value: 16,
      color: Colors.white,
      text: "16%",
    },
    { value: 3, color: "#FFA5BA", gradientCenterColor: "#FF7F97", text: "3%" },
  ];

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
          <View  className="py-5 items-center">
          <PieChart
          data={pieData}
          donut
          showGradient
          sectionAutoFocus
          semiCircle
          focusOnPress
          radius={70}
          innerRadius={55}
          innerCircleColor={Colors.black}
          centerLabelComponent={() => {
            return (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text
                  style={{fontSize: 22, color: 'white', fontWeight: 'bold'}}>
                  47%
                </Text>
              </View>
            );
          }}
        />
          </View>
        </View>

        <ExpenseBlcok ExpenseList={ExpenseList}/>
        <IncomeBlock incomeList={incomeList} />
      </ScrollView>
    </View>
  );
};

export default page;
