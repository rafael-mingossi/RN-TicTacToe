import { ScrollView, TextInput as NativeTextInput } from "react-native";
import { GradientBg, TextInput, Button } from "@components";
import styles from "./signup.styles";
import { FC, useRef, useState } from "react";
import { Auth } from "aws-amplify";
// import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import { StackNavigatorParams } from "@config/navigator";

const Signup: FC = () => {
  const signupRef = useRef<NativeTextInput | null>(null);
  const [form, setForm] = useState({
    username: "test",
    email: "",
    password: "12345678",
  });
  const [loading, setLoading] = useState(false);

  const setFormInput = (key: keyof typeof form, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const signup = async () => {
    setLoading(true);
    const { username, password } = form;
    try {
      await Auth.signIn(username, password);
      // navigation.navigate("Home");
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
          onSubmitEditing={() => signupRef.current?.focus()}
          style={{ marginBottom: 30 }}
        />
        <TextInput
          onChangeText={(val) => setFormInput("username", val)}
          value={form.username}
          placeholder="Email"
          returnKeyType="next"
          onSubmitEditing={() => signupRef.current?.focus()}
          style={{ marginBottom: 30 }}
        />
        <TextInput
          onChangeText={(val) => setFormInput("password", val)}
          value={form.password}
          ref={signupRef}
          placeholder="Password"
          secureTextEntry
          returnKeyType="done"
          style={{ marginBottom: 40 }}
        />

        <Button loading={loading} title="Sign Up" onPress={signup} />
      </ScrollView>
    </GradientBg>
  );
};

export default Signup;
