import { SafeAreaView } from "react-native";
import styles from "./single-player-game.styles";
import { GradientBg, Board } from "@components";
import { FC, useEffect, useState } from "react";
import { BoardState, isTerminal, getBestMove, isEmpty } from "@utils";

const SinglePlayerGame: FC = () => {
  const [state, setState] = useState<BoardState>([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);

  const [turn, setTurn] = useState<"HUMAN" | "BOT">(
    Math.random() < 0.5 ? "HUMAN" : "BOT"
  );
  const [isHumanMaximizing, setIsHumanMaximizing] = useState<boolean>(true);
  const gameResult = isTerminal(state);

  const insertCell = (cell: number, symbol: "x" | "o"): void => {
    const stateCopy: BoardState = [...state];
    if (stateCopy[cell] || isTerminal(stateCopy)) return;

    stateCopy[cell] = symbol;
    setState(stateCopy);
  };

  //HUMAN PLAY WILL BE HANDLED HERE
  const handleOnCellPress = (cell: number): void => {
    if (turn !== "HUMAN") return;
    insertCell(cell, isHumanMaximizing ? "x" : "o");
    setTurn("BOT");
  };

  useEffect(() => {
    if (gameResult) {
      //TODO back here later
    } else {
      if (turn === "BOT") {
        //Check the center and corners to start playing
        //Start condition when the board is empty
        if (isEmpty(state)) {
          const centerAndCorners = [0, 2, 6, 8, 4];

          //Making the first move random within corners and center
          const firstMove =
            centerAndCorners[
              Math.floor(Math.random() * centerAndCorners.length)
            ];

          insertCell(firstMove, "x");
          setIsHumanMaximizing(false); //that is the case when the BOT starts
          setTurn("HUMAN");
        } else {
          const best = getBestMove(state, !isHumanMaximizing, 0, -1);
          insertCell(best, isHumanMaximizing ? "o" : "x");
          setTurn("HUMAN");
        }
      }
    }
  }, [turn, state]);

  return (
    <GradientBg>
      <SafeAreaView style={styles.container}>
        <Board
          disabled={!!isTerminal(state) || turn !== "HUMAN"}
          onCellPressed={(cell) => handleOnCellPress(cell)}
          size={300}
          state={state}
        />
      </SafeAreaView>
    </GradientBg>
  );
};

export default SinglePlayerGame;
