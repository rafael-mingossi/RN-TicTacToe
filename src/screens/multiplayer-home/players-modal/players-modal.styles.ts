import { Dimensions, StyleSheet } from "react-native";
import { colours } from "@utils";
const SCREEN_HEIGHT = Dimensions.get("screen").height;

const styles = StyleSheet.create({
  playerItem: {
    backgroundColor: colours.purple,
    borderTopWidth: 1,
    borderColor: colours.lightPurple,
    padding: 15,
    marginBottom: 20,
  },
  modalContainer: {
    height: SCREEN_HEIGHT * 0.6,
    marginTop: SCREEN_HEIGHT * 0.4,
  },
  searchContainer: { padding: 20, backgroundColor: colours.purple },
});

export default styles;
