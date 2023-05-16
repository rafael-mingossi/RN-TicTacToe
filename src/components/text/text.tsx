import { ReactNode, FC } from "react";
import { Text as NativeText, TextProps as NativeTextProps } from "react-native";

type TextProps = {
  weight: "400" | "700" | string;
  children: ReactNode;
} & NativeTextProps;

const defaultProps = {
  weight: "400",
};

const Text: FC<TextProps> = ({ children, style, weight, ...props }) => {
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
Text.defaultProps = defaultProps;
export default Text;
