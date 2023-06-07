import { StyleSheet } from "react-native";
import { colours, globalStyles } from "@utils";

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
  },
  link: {
    color: colours.lightGreen,
    textAlign: "center",
    marginTop: 20,
    textDecorationLine: "underline",
  },
});

export default styles;
