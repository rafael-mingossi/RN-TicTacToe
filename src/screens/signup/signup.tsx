import {
  ScrollView,
  TextInput as NativeTextInput,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { GradientBg, TextInput, Button } from "@components";
import { Text } from "../../components";
import OTPInput from "../../components/otp-input/otp-input";
import styles from "./signup.styles";
import { FC, useRef, useState } from "react";
import { Auth } from "aws-amplify";
import { useHeaderHeight } from "@react-navigation/elements";
import { StackNavigatorParams } from "@config/navigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { colours } from "@utils";
import Toast from "react-native-toast-message";

type SignUpProps = {
  navigation: NativeStackNavigationProp<StackNavigatorParams, "SignUp">;
};

const Signup: FC<SignUpProps> = ({ navigation }) => {
  const passwordRef = useRef<NativeTextInput | null>(null);
  const emailRef = useRef<NativeTextInput | null>(null);
  const nameRef = useRef<NativeTextInput | null>(null);

  const headerHeight = useHeaderHeight();

  const [form, setForm] = useState({
    username: "rafaelM",
    email: "rafaelmingossi@gmail.com",
    name: "Rafael",
    password: "12345678",
  });
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"signUp" | "otp">("otp");
  const [confirming, setConfirming] = useState(false);
  const [resending, setResending] = useState(false);
  const [code, setCode] = useState<string>("");

  const setFormInput = (key: keyof typeof form, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const signup = async () => {
    setLoading(true);
    const { username, password, name, email } = form;
    try {
      const res = await Auth.signUp({
        username,
        password,
        attributes: {
          email,
          name,
        },
      });
      if (res) {
        Toast.show({
          type: "success",
          text1: "Sign up successful",
          text2: "Check your email and enter the code",
        });
        setStep("otp");
      } else {
        Toast.show({
          type: "error",
          text1: "Something went wrong",
          text2: "Check your details and try again",
        });
      }
    } catch (error) {
      console.log("login error ->> ", error);
      Toast.show({
        type: "error",
        text1: "Submission error",
        text2: "Try again please",
      });
    }
    setLoading(false);
  };

  const confirmCode = async (code: string) => {
    setConfirming(true);
    try {
      const res = await Auth.confirmSignUp(form.username, code);
      if (res) {
        setCode("");
        Toast.show({
          type: "success",
          text1: "Confirmation successful",
          text2: "Login to your account",
        });
        navigation.navigate("Login");
      }
    } catch (e) {
      //HANDLE POSSIBLE RETURN ERROR MESSAGES
      console.log("error confirm code ->", e);
    }
    setConfirming(false);
  };

  const resendCode = async (username: string) => {
    setResending(true);
    try {
      const res = await Auth.resendSignUp(username);

      if (res) {
        Toast.show({
          type: "success",
          text1: "Code sent",
          text2: "PLease check your email",
        });
      }
    } catch (e) {
      console.log(e);
    }
    setResending(false);
  };

  return (
    <GradientBg>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={headerHeight}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container}>
          {step === "otp" ? (
            confirming ? (
              <ActivityIndicator color={colours.lightGreen} />
            ) : (
              <>
                <Text style={styles.otpText}>
                  Enter the code that you received via email.
                </Text>
                <OTPInput
                  otpCodeChanged={(e) => setCode(e)}
                  onConclude={() => confirmCode(code)}
                />
                {resending ? (
                  <ActivityIndicator color={colours.lightGreen} />
                ) : (
                  <TouchableOpacity onPress={() => resendCode(form.username)}>
                    <Text style={styles.resendLink}>Resend Code</Text>
                  </TouchableOpacity>
                )}
              </>
            )
          ) : (
            ""
          )}

          {step === "signUp" && (
            <>
              <TextInput
                onChangeText={(val) => setFormInput("username", val)}
                value={form.username}
                placeholder="Username"
                returnKeyType="next"
                onSubmitEditing={() => emailRef.current?.focus()}
                style={{ marginBottom: 30 }}
              />
              <TextInput
                ref={emailRef}
                onChangeText={(val) => setFormInput("email", val)}
                value={form.email}
                placeholder="Email"
                returnKeyType="next"
                keyboardType="email-address"
                onSubmitEditing={() => nameRef.current?.focus()}
                style={{ marginBottom: 30 }}
              />
              <TextInput
                ref={nameRef}
                onChangeText={(val) => setFormInput("name", val)}
                value={form.name}
                placeholder="Name"
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

              <Button loading={loading} title="Sign Up" onPress={signup} />
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </GradientBg>
  );
};

export default Signup;
