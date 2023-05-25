import { StyleSheet } from "react-native";
import { colours } from "@utils";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 40,
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
