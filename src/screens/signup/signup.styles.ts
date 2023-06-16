import { StyleSheet } from "react-native";
import { colours, globalStyles } from "@utils";

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
  },
  otpText: {
    color: colours.lightGreen,
    fontSize: 15,
    textAlign: "center",
    marginBottom: 30,
  },
  resendLink: {
    color: colours.lightGreen,
    textAlign: "center",
    textDecorationLine: "underline",
  },
});

export default styles;
