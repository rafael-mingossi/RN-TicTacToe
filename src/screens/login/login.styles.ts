import { StyleSheet } from "react-native";
import { colours } from "@utils";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 40,
  },
  link: {
    color: colours.lightGreen,
    textAlign: "center",
    marginTop: 20,
    textDecorationLine: "underline",
  },
});

export default styles;
