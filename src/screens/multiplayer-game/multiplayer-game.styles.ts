import { Platform, StyleSheet } from "react-native";
import { colours, globalStyles } from "@utils";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? "10%" : 0,
    marginTop: 40,
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
  turn: {
    color: colours.lightGreen,
    fontSize: 22,
    textAlign: "center",
    marginBottom: 20,
  },
  header: {
    flexDirection: "column",
    marginBottom: 30,
  },
  participants: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userBox: {
    backgroundColor: "white",
    width: "35%",
    padding: 10,
    borderWidth: 1,
    borderColor: colours.lightPurple,
  },
  smallTxt: { fontSize: 12, textAlign: "center" },
  playerTurn: {
    borderWidth: 3,
  },
});

export default styles;
