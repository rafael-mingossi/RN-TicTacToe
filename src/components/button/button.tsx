import { FC } from "react";
import {
  TouchableOpacity,
  TouchableOpacityProps,
  ActivityIndicator,
} from "react-native";
import Text from "../text/text";
import styles from "./button.style";

type ButtonProps = {
  title: string;
  loading?: boolean;
} & TouchableOpacityProps;

const Button: FC<ButtonProps> = ({ loading, title, style, ...props }) => {
  return (
    <TouchableOpacity
      disabled={loading}
      {...props}
      style={[style, styles.container]}
    >
      {loading ? (
        <ActivityIndicator color="#000" />
      ) : (
        <Text style={styles.btnTxt}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
