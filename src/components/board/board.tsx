import { View, TouchableOpacity } from "react-native";
import { FC } from "react";
import Text from "../text/text";
import { BoardResult, BoardState } from "@utils";
import BoardLine from "./board-line";
import styles from "./board.style";

type BoardProps = {
  state: BoardState;
  size: number;
  disabled?: boolean;
  onCellPressed?: (index: number) => void;
  gameResult?: BoardResult | false;
};
const Board: FC<BoardProps> = ({
  state,
  size,
  disabled,
  gameResult,
  onCellPressed,
}) => {
  return (
    <View
      style={[
        {
          width: size,
          height: size,
        },
        styles.board,
      ]}
    >
      {state.map((cell, index) => {
        return (
          <TouchableOpacity
            disabled={cell !== null || disabled}
            onPress={() => onCellPressed && onCellPressed(index)}
            key={index}
            style={[styles.cell, styles[`cell${index}` as "cell"]]}
          >
            <Text
              weight={"700"}
              style={[{ fontSize: size / 7 }, styles.cellText]}
            >
              {cell}
            </Text>
          </TouchableOpacity>
        );
      })}

      {gameResult && <BoardLine size={size} gameResult={gameResult} />}
    </View>
  );
};

export default Board;
