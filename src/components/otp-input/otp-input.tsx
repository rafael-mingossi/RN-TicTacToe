import { useIsFocused } from "@react-navigation/native";
import { FC, useRef, useState } from "react";
import { TextInput, View } from "react-native";
import styles from "./otp-input.styles";
import { Button } from "../index";
import useTimeout from "../../../hooks/useTimeout";

export interface IOTPInputProps {
  otpCodeChanged: (otpCode: string) => void;
  onConclude: () => void;
}

const NUMBER_OF_INPUTS = 6;

const OTPInput: FC<IOTPInputProps> = (props) => {
  const { otpCodeChanged, onConclude } = props;
  const isFocused = useIsFocused();
  const [values, setValues] = useState<string[]>(["", "", "", "", "", ""]);
  const itemsRef = useRef<Array<TextInput | null>>([]);

  const applyOTPCodeToInputs = (code: string) => {
    // split up code and apply it to all inputs
    const codeArray = code.split("");
    codeArray.forEach((char, index) => {
      const input = itemsRef.current[index];
      if (input) {
        input.setNativeProps({
          text: char,
        });
      }
    });
    // focus on last input as a cherry on top
    const lastInput = itemsRef.current[itemsRef.current.length - 1];
    if (lastInput) {
      lastInput.focus();
      otpCodeChanged(code);
      onConclude();
    }
  };

  // const onConclude = (text: string) => {};

  useTimeout(
    () => {
      // focus on the first input
      const firstInput = itemsRef.current[0];
      if (firstInput) {
        firstInput.focus();
      }
    },
    isFocused ? 1000 : null
  );

  return (
    <View style={styles.mainView}>
      <View style={styles.subView}>
        {Array.from({ length: NUMBER_OF_INPUTS }, (_, index) => (
          <TextInput
            style={styles.singleInput}
            ref={(el) => (itemsRef.current[index] = el)}
            key={index}
            keyboardType={"numeric"}
            placeholder={"X"}
            value={values[index]}
            defaultValue=""
            onEndEditing={() => (index === 5 ? onConclude() : "")}
            // first input can have a length of 6 because they paste their code into it
            maxLength={index === 0 ? 6 : 1}
            onChange={(event) => {
              const { text } = event.nativeEvent;

              // only continue one if we see a text of length 1 or 6
              if (text.length === 0 || text.length === 1 || text.length === 6) {
                if (text.length === 6) {
                  applyOTPCodeToInputs(text);
                  return;
                }
                // going forward, only if text is not empty
                if (text.length === 1 && index !== NUMBER_OF_INPUTS - 1) {
                  const nextInput = itemsRef.current[index + 1];
                  if (nextInput) {
                    nextInput.focus();
                  }
                }
              }
              // determine new value
              const newValues = [...values];
              newValues[index] = text;

              // update state
              setValues(newValues);
              // also call callback as a flat string
              otpCodeChanged(newValues.join(""));
            }}
            onKeyPress={(event) => {
              if (event.nativeEvent.key === "Backspace") {
                // going backward:
                if (index !== 0) {
                  const previousInput = itemsRef.current[index - 1];
                  if (previousInput) {
                    previousInput.focus();
                    return;
                  }
                }
              }
            }}
            textContentType="oneTimeCode"
          />
        ))}
      </View>
      <Button
        title="Submit Code"
        onPress={() => onConclude()}
        style={{ marginTop: 30, marginBottom: 30 }}
      />
    </View>
  );
};
export default OTPInput;
