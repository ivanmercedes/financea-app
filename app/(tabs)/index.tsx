import ExpenseBlcok from "@/components/ExpenseBlock";
import IncomeBlock from "@/components/IncomeBlock";
import SpendingBlock from "@/components/SpendingBlock";
import Colors from "@/constants/Colors";
import ExpenseList from "@/data/expenses.json";
import icome from "@/data/income.json";
import spendingList from "@/data/spending.json";
import { fetchAPI } from "@/lib/fetch";
import { useAppStore } from "@/store/appStore";
import { useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { shallow } from "zustand/shallow";

const page = () => {
  const {pieData, incomeList, expenseList} = useAppStore(
    (state) => ({
      pieData: state.pieData,
      incomeList: state.incomeList,
      expenseList : state.expenseList
    }),
    shallow
  );

  const { setIncomeList, setExpenseList } = useAppStore();

  useEffect(() => {
    setIncomeList(icome);
    setExpenseList(ExpenseList);

    fetchAPI(`/(api)/dashboard`,{
      headers: {
        token: `user_2kvsjiZy3c7hTWQPwHafmyYImPo`,
      },
    }).then((data) => {
      console.log(data);
    });
  }, []);

  return (
    <View className="flex-1 bg-black pt-4 px-5">
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
          <View className="py-5 items-center">
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
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Text
                      style={{
                        fontSize: 22,
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      47%
                    </Text>
                  </View>
                );
              }}
            />
          </View>
        </View>

        <ExpenseBlcok ExpenseList={expenseList} />
        <IncomeBlock incomeList={incomeList} />

        <SpendingBlock spendingList={spendingList} />
      </ScrollView>
    </View>
  );
};

export default page;
