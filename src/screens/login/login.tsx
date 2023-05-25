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

type LoginProps = {
  navigation: NativeStackNavigationProp<StackNavigatorParams, "Login">;
};

const Login: FC<LoginProps> = ({ navigation }) => {
  const passwordRef = useRef<NativeTextInput | null>(null);

  const [form, setForm] = useState({
    username: "test",
    password: "12345678",
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
      navigation.navigate("Home");
    } catch (error) {
      console.log("login error ->> ", error);
    }
    setLoading(false);
  };

  return (
    <GradientBg>
      <ScrollView contentContainerStyle={styles.container}>
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
