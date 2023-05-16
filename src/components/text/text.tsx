import { ReactNode } from "react";
import { Text as NativeText, TextProps as NativeTextProps } from "react-native";

type TextProps = {
  weight: "400" | "700";
  children: ReactNode;
} & NativeTextProps;

const Text = ({ children, style, weight, ...props }: TextProps) => {
  let fontFamily;
  if (weight === "400") {
    fontFamily = "DeliusUnicase_400Regular";
  }

  if (weight === "700") {
    fontFamily = "DeliusUnicase_700Bold";
  }

  return (
    <NativeText {...props} style={[{ fontFamily }, style]}>
      {children}
    </NativeText>
  );
};
Text.defaultProps = { weight: "400" };
export default Text;
