import { FC } from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import Text from "../text/text";
import styles from "./button.style";

type ButtonProps = {
  title: string;
} & TouchableOpacityProps;

const Button: FC<ButtonProps> = ({ title, style, ...props }) => {
  return (
    <TouchableOpacity {...props} style={[style, styles.container]}>
      <Text style={styles.btnTxt}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
