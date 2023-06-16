import {
  ScrollView,
  TextInput as NativeTextInput,
  TouchableOpacity,
} from "react-native";
import { GradientBg, TextInput, Button, Text } from "@components";
import styles from "./login.styles";
import { FC, useRef, useState } from "react";
import { Auth } from "aws-amplify";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackNavigatorParams } from "@config/navigator";
import { RouteProp } from "@react-navigation/native";
import Toast from "react-native-toast-message";

type LoginProps = {
  navigation: NativeStackNavigationProp<StackNavigatorParams, "Login">;
  route: RouteProp<StackNavigatorParams, "Login">;
};

const Login: FC<LoginProps> = ({ navigation, route }) => {
  const redirect = route.params?.redirect;
  const passwordRef = useRef<NativeTextInput | null>(null);

  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const setFormInput = (key: keyof typeof form, value: string) => {
    setForm({ ...form, [key]: value });
  };
  const login = async () => {
    setLoading(true);
    const { username, password } = form;
    try {
      await Auth.signIn(username, password);
      redirect ? navigation.replace(redirect) : navigation.navigate("Home");
    } catch (error: any) {
      if (form.username === "" || form.password === "") {
        Toast.show({
          type: "error",
          text1: "Fields cannot be empty",
          text2: "Add your credentials and try again",
        });
      } else if (error.toString().includes("UserNotConfirmedException")) {
        Toast.show({
          type: "error",
          text1: "User not confirmed",
          text2: "Confirm your registration and try again",
        });
        navigation.navigate("SignUp", { username });
      } else if (error.toString().includes("UserNotFoundException")) {
        Toast.show({
          type: "error",
          text1: "User does not exist",
          text2: "Check your username",
        });
      } else if (error.toString().includes("NotAuthorizedException")) {
        Toast.show({
          type: "error",
          text1: "Wrong username or password",
          text2: "Check your credentials",
        });
      }
    }
    setLoading(false);
  };

  return (
    <GradientBg>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps={"always"}
      >
        <TextInput
          onChangeText={(val) => setFormInput("username", val)}
          value={form.username}
          placeholder="Username"
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current?.focus()}
          style={{ marginBottom: 30 }}
        />
        <TextInput
          onChangeText={(val) => setFormInput("password", val)}
          value={form.password}
          ref={passwordRef}
          placeholder="Password"
          secureTextEntry
          returnKeyType="done"
          style={{ marginBottom: 40 }}
        />

        <Button loading={loading} title="Login" onPress={login} />

        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.link}>Don&apos;t have an account?</Text>
        </TouchableOpacity>
      </ScrollView>
    </GradientBg>
  );
};

export default Login;
