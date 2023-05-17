import { SafeAreaView } from "react-native";
import styles from "./single-player-game.styles";
import { GradientBg, Board } from "@components";
import { FC } from "react";
import { printFormattedBoard, BoardState } from "@utils";

const SinglePlayerGame: FC = () => {
  const b: BoardState = ["x", "o", "x", "x", "o", "o", "x", "o", null];

  printFormattedBoard(b);
  return (
    <GradientBg>
      <SafeAreaView style={styles.container}>
        <Board onCellPressed={(index) => alert(index)} size={300} state={b} />
      </SafeAreaView>
    </GradientBg>
  );
};

export default SinglePlayerGame;
