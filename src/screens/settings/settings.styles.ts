import { StyleSheet } from "react-native";
import { colours } from "@utils";

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    paddingHorizontal: 30,
  },
  field: {
    marginBottom: 30,
  },
  label: {
    color: colours.lightGreen,
    fontSize: 18,
  },
  choices: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    marginHorizontal: -5,
  },
  choice: {
    backgroundColor: colours.lightGreen,
    padding: 10,
    margin: 5,
  },
  choiceText: {
    color: colours.darkPurple,
  },
  switchField: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 0,
  },
});

export default styles;
