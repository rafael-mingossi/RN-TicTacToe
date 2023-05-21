import { Platform, StyleSheet } from "react-native";
import { colours } from "@utils";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? "10%" : 0,
    marginTop: 80,
  },
  difficulty: {
    color: colours.lightGreen,
    fontSize: 22,
    textAlign: "center",
    marginBottom: 20,
  },
  results: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 80,
  },
  resultsBox: {
    backgroundColor: colours.lightGreen,
    borderWidth: 1,
    borderColor: colours.lightPurple,
    alignItems: "center",
    padding: 15,
    marginHorizontal: 5,
  },
  resultsTitle: {
    color: colours.darkPurple,
    fontSize: 14,
  },
  resultsCount: {
    color: colours.darkPurple,
    fontSize: 18,
  },
  modal: {
    position: "absolute",
    backgroundColor: colours.lightPurple,
    bottom: 40,
    left: 30,
    right: 30,
    padding: 30,
    borderWidth: 3,
    borderColor: colours.lightGreen,
  },
  modalText: {
    color: colours.lightGreen,
    fontSize: 28,
    textAlign: "center",
    marginBottom: 30,
  },
});

export default styles;
