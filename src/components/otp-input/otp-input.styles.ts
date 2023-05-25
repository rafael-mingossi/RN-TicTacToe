import { StyleSheet } from "react-native";
import { colours } from "@utils";

const styles = StyleSheet.create({
  mainView: {
    flexDirection: "column",
  },
  subView: {
    marginTop: 10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  singleInput: {
    padding: 10,
    backgroundColor: colours.purple,
    borderBottomWidth: 1,
    borderColor: "white",
    fontSize: 20,
    color: colours.lightGreen,
    fontFamily: "DeliusUnicase_400Regular",
    textAlign: "center",
  },
  btnWrapper: {
    marginTop: 20,
    marginBottom: 25,
    backgroundColor: colours.purple,
    borderBottomWidth: 1,
    borderColor: colours.lightGreen,
    padding: 10,
    alignItems: "center",
  },
  btnText: {
    color: colours.lightGreen,
    fontSize: 15,
  },
});

export default styles;
