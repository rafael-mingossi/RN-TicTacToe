import { ScrollView } from "react-native";
import { Text, GradientBg } from "@components";
import styles from "./login.styles";

const Login = () => {
  return (
    <GradientBg>
      <ScrollView contentContainerStyle={styles.container}>
        <Text>Login</Text>
      </ScrollView>
    </GradientBg>
  );
};

export default Login;
