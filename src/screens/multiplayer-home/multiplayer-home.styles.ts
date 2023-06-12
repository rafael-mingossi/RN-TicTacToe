import { StyleSheet } from "react-native";
import { colours, globalStyles } from "@utils";

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
  },
  item: {
    backgroundColor: colours.purple,
    padding: 15,
    borderTopWidth: 1,
    borderColor: colours.lightPurple,
    marginBottom: 20,
  },
  newGameBtn: {
    backgroundColor: colours.lightPurple,
    padding: 20,
    paddingBottom: 30,
  },
  newGameBtnTxt: {
    color: colours.lightGreen,
    textAlign: "center",
    fontSize: 17,
  },
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cardTxt: {
    color: colours.lightGreen,
    textAlign: "center",
    fontSize: 17,
    marginBottom: 10,
  },
});

export default styles;
