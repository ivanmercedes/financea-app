import { InputFieldProps } from "@/types";
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View,
} from "react-native";

const InputField = ({
  label,
  labelStyle,
  icon: Icon,
  iconStyle,
  secureTextEntry = false,
  containerStyle,
  inputStyle,
  className,
  ...props
}: InputFieldProps) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="my-2 w-full">
          <Text className={`text-md font-JakartaSemiBold mb-2 ${labelStyle}`}>
            {label}
          </Text>
          <View
            className={`flex flex-row justify-start items-center relative bg-neutral-100 rounded-full border-neutral-100 focus:border-x-primary-500 ${containerStyle}`}
          >
            {Icon && (
              //   <Image source={icon} className={`w-5 h-5 ml-3 ${iconStyle}`} />
              <View className={`ml-3 ${iconStyle}`}>
                <Icon />
              </View>
            )}
            <TextInput
              className={`rounded-full p-3 font-JakartaSemiBold flex-1 text-[14px] ${inputStyle} text-left`}
              secureTextEntry={secureTextEntry}
              {...props}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default InputField;
