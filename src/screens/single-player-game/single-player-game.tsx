import { SafeAreaView, Dimensions, View } from "react-native";
import styles from "./single-player-game.styles";
import { GradientBg, Board, Text, Button } from "@components";
import { FC, useEffect, useState } from "react";
import { BoardState, isTerminal, getBestMove, isEmpty, Cell } from "@utils";
import { useSettings, difficulties } from "@contexts/settings-context";
import {
  InterstitialAd,
  TestIds,
  AdEventType,
} from "react-native-google-mobile-ads";
// @ts-ignore
import { useSounds } from "@hooks";

const SCREEN_WIDTH = Dimensions.get("screen").width;
const SinglePlayerGame: FC = () => {
  const playSound = useSounds();
  const { settings } = useSettings();
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

  const [gamesCount, setGamesCount] = useState({
    wins: 0,
    losses: 0,
    draws: 0,
  });

  const interstitial = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ["gaming", "clothing"],
  });

  const showAd = async () => {
    try {
      await interstitial.load();
      setTimeout(() => {
        interstitial.show().then((p) => {
          console.log(p);
        });
      }, 2000);
    } catch (e) {
      console.log("ADS ->", e);
    }
  };

  const gameResult = isTerminal(state);

  const insertCell = (cell: number, symbol: "x" | "o"): void => {
    const stateCopy: BoardState = [...state];
    if (stateCopy[cell] || isTerminal(stateCopy)) return;

    stateCopy[cell] = symbol;
    setState(stateCopy);

    try {
      symbol === "x" ? playSound("pop1") : playSound("pop2");
    } catch (e) {
      console.log("error playing sound", e);
    }
  };

  //HUMAN PLAY WILL BE HANDLED HERE
  const handleOnCellPress = (cell: number): void => {
    if (turn !== "HUMAN") return;
    insertCell(cell, isHumanMaximizing ? "x" : "o");
    setTurn("BOT");
  };

  const getWinner = (winnerSymbol: Cell): "HUMAN" | "BOT" | "DRAW" => {
    if (winnerSymbol === "x") {
      return isHumanMaximizing ? "HUMAN" : "BOT";
    }
    if (winnerSymbol === "o") {
      return isHumanMaximizing ? "BOT" : "HUMAN";
    }
    return "DRAW";
  };

  const newGame = () => {
    setState([null, null, null, null, null, null, null, null, null]);
    setTurn(Math.random() < 0.5 ? "HUMAN" : "BOT");
  };

  useEffect(() => {
    if (gameResult) {
      const winner = getWinner(gameResult.winner);

      if (winner === "HUMAN") {
        playSound("win");
        setGamesCount({ ...gamesCount, wins: gamesCount.wins + 1 });
      }

      if (winner === "BOT") {
        playSound("loss");
        setGamesCount({ ...gamesCount, losses: gamesCount.losses + 1 });
      }

      if (winner === "DRAW") {
        playSound("draw");
        setGamesCount({ ...gamesCount, draws: gamesCount.draws + 1 });
      }

      const totalGames = gamesCount.wins + gamesCount.draws + gamesCount.losses;

      if (totalGames % 3 === 0) {
        showAd().then(() => {});
      }
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
          const best = getBestMove(
            state,
            !isHumanMaximizing,
            0,
            parseInt(settings ? settings?.difficulty : "-1")
          );
          insertCell(best, isHumanMaximizing ? "o" : "x");
          setTurn("HUMAN");
        }
      }
    }
  }, [turn, state]);

  return (
    <GradientBg>
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.difficulty}>
            Difficulty:{" "}
            {settings ? difficulties[settings.difficulty] : "Impossible"}
          </Text>
          <View style={styles.results}>
            <View style={styles.resultsBox}>
              <Text style={styles.resultsTitle}>Wins</Text>
              <Text style={styles.resultsCount}>{gamesCount.wins}</Text>
            </View>
            <View style={styles.resultsBox}>
              <Text style={styles.resultsTitle}>Draws</Text>
              <Text style={styles.resultsCount}>{gamesCount.draws}</Text>
            </View>
            <View style={styles.resultsBox}>
              <Text style={styles.resultsTitle}>Losses</Text>
              <Text style={styles.resultsCount}>{gamesCount.losses}</Text>
            </View>
          </View>
        </View>

        <Board
          disabled={!!isTerminal(state) || turn !== "HUMAN"}
          onCellPressed={(cell) => handleOnCellPress(cell)}
          size={SCREEN_WIDTH - 90} //or 60
          state={state}
          gameResult={gameResult}
        />

        {gameResult && (
          <View style={styles.modal}>
            <Text style={styles.modalText}>
              {getWinner(gameResult.winner) === "HUMAN" && "You Won"}
              {getWinner(gameResult.winner) === "BOT" && "You Lose"}
              {getWinner(gameResult.winner) === "DRAW" && "It's a Draw"}
            </Text>
            <Button title="Play Again" onPress={() => newGame()} />
          </View>
        )}
      </SafeAreaView>
    </GradientBg>
  );
};

export default SinglePlayerGame;
