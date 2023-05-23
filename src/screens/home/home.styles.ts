import { StyleSheet } from "react-native";
import colours from "../../utils/colours";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    position: "relative",
    paddingTop: 100,
  },
  logo: {
    height: 150,
    width: "100%",
    resizeMode: "contain",
  },
  buttons: { marginTop: 30 },
  button: { marginBottom: 20 },
  loginText: {
    color: colours.lightGreen,
    textAlign: "center",
    fontSize: 12,
  },
});

export default styles;
