import { TextInputProps, TouchableOpacityProps } from "react-native";

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

export interface TokenCache {
  getToken: (key: string) => Promise<string | undefined | null>
  saveToken: (key: string, token: string) => Promise<void>
  clearToken?: (key: string) => void
}

export interface ButtonProps extends TouchableOpacityProps {
  title: string;
  bgVariant?: "primary" | "secondary" | "danger" | "outline" | "success";
  textVariant?: "primary" | "default" | "secondary" | "danger" | "success";
  IconLeft?: React.ComponentType<any>;
  IconRight?: React.ComponentType<any>;
  className?: string;
}

export interface InputFieldProps extends TextInputProps {
  label: string;
  icon?: any;
  secureTextEntry?: boolean;
  labelStyle?: string;
  containerStyle?: string;
  inputStyle?: string;
  iconStyle?: string;
  className?: string;
}