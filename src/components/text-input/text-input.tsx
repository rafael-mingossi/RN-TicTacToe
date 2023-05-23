import styles from "./text-input.styles";
import {
  TextInput as TextInputNative,
  TextInputProps as TextInputPropsNative,
} from "react-native";
import { ForwardedRef, forwardRef } from "react";

const TextInput = forwardRef<TextInputNative, TextInputPropsNative>(
  ({ style, ...props }, ref: ForwardedRef<TextInputNative>) => {
    return (
      <TextInputNative
        {...props}
        ref={ref}
        placeholderTextColor={"#5d5379"}
        style={[styles.container, style]}
      />
    );
  }
);

TextInput.displayName = "TextInput";

export default TextInput;
