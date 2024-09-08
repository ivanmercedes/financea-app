export interface ExpenseType {
  id: string;
  name: string;
  amount: string;
  percentage: string;
}

export interface IncomeType {
  id: string;
  name: string;
  amount: string;
}

export interface SpendingType {
  id: string;
  name: string;
  amount: string;
  date: string;
}

export interface PieType {
  value: number;
  color: string;
  focused?: boolean;
  text: string;
  gradientCenterColor?: string;
}