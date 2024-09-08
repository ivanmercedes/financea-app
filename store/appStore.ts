import Colors from '@/constants/Colors';
import { ExpenseType, IncomeType, PieType } from '@/types';
import { createWithEqualityFn } from 'zustand/traditional';

interface AppStoreState {
    incomeList: IncomeType[];
    pieData: PieType[];
    expenseList: ExpenseType[];
    setIncomeList: (incomeList: IncomeType[]) => void;
    setExpenseList: (expenseList: ExpenseType[]) => void;
}

export const useAppStore = createWithEqualityFn<AppStoreState>((set) => ({
    incomeList: [],
    pieData: [
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
    ],
    expenseList: [],
   setIncomeList: (incomeList: IncomeType[]) => set(state => ({ incomeList })),
   setExpenseList: (expenseList: ExpenseType[]) => set(state => ({ expenseList })),
}))