import {
  View,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { GradientBg, Text, Board, Button } from "@components";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { StackNavigatorParams } from "@config/navigator";
import { getGame, startGame, playMove } from "./multiplayer-game.graphql";
import { GraphQLResult } from "@aws-amplify/api";
import { getGameQuery, playMoveMutation, startGameMutation } from "@api";
import Observable from "zen-observable";

import styles from "./multiplayer-game.styles";
import { FC, useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import {
  BoardState,
  colours,
  Moves,
  getErrorMessage,
  onUpdateGameById,
  isTerminal,
} from "@utils";
import { useAuth } from "@contexts/auth-context";
import { useSounds } from "../../../hooks";
import { difficulties } from "@contexts/settings-context";

type GameType = getGameQuery["getGame"];

type MultiplayerGameScreenNavigationProp = NativeStackNavigationProp<
  StackNavigatorParams,
  "MultiplayerGame"
>;
type MultiplayerGameScreenRouteProp = RouteProp<
  StackNavigatorParams,
  "MultiplayerGame"
>;
type MultiplayerGameProps = {
  navigation: MultiplayerGameScreenNavigationProp;
  route: MultiplayerGameScreenRouteProp;
};

const SCREEN_WIDTH = Dimensions.get("screen").width;

const MultiplayerGame: FC<MultiplayerGameProps> = ({ navigation, route }) => {
  const { user } = useAuth();
  const playSound = useSounds();
  const { gameID: existingGameID, invitee } = route.params;
  const [gameID, setGameID] = useState<string | null>(null);
  const [game, setGame] = useState<GameType | null>(null);
  const [loading, setLoading] = useState(false);
  const [playingTurn, setPlayingTurn] = useState<Moves | false>(false);
  const [finished, setFinished] = useState(false);
  const gameResult = game ? isTerminal(game.state as BoardState) : false;
  const opponentUsername =
    game && user && game.owners.find((p) => p !== user.username);
  const player1 = game?.players?.items && game.players.items[0];
  const player2 = game?.players?.items && game.players.items[1];

  const isActive = () => {
    return game && (game.status === "ACTIVE" || game.status === "REQUESTED");
  };

  const initGame = async () => {
    setLoading(true);
    let gameID = existingGameID;
    try {
      if (!gameID) {
        const startGameRes = (await API.graphql(
          graphqlOperation(startGame, {
            invitee,
          })
        )) as GraphQLResult<startGameMutation>;
        if (startGameRes.data?.startGame) {
          gameID = startGameRes.data.startGame.id;
        }
      }
      if (gameID) {
        const getGameRes = (await API.graphql(
          graphqlOperation(getGame, {
            id: gameID,
          })
        )) as GraphQLResult<getGameQuery>;

        if (getGameRes.data?.getGame) {
          if (getGameRes.data.getGame.status === "FINISHED") {
            setFinished(true);
          }
          setGame(getGameRes.data?.getGame);
          setGameID(gameID);
        }
      }
    } catch (error) {
      // @ts-ignore
      Alert.alert("Error!", getErrorMessage(error));
    }
    setLoading(false);
  };

  const playTurn = async (index: Moves) => {
    setPlayingTurn(index);
    try {
      const playMoveRes = (await API.graphql(
        graphqlOperation(playMove, {
          index,
          game: gameID,
        })
      )) as GraphQLResult<playMoveMutation>;

      if (game && playMoveRes.data?.playMove) {
        const { status, state, winner, turn } = playMoveRes.data.playMove;
        setGame({ ...game, status, state, winner, turn });
      }
    } catch (error) {
      // @ts-ignore
      Alert.alert("Error!", getErrorMessage(error));
    }
    setPlayingTurn(false);
  };

  useEffect(() => {
    if (game && (game.status === "REQUESTED" || game.status === "ACTIVE")) {
      const gameUpdates = API.graphql(
        graphqlOperation(onUpdateGameById, {
          id: gameID,
        })
      ) as unknown as Observable<{ [key: string]: any }>;

      const subscription = gameUpdates.subscribe({
        next: ({ value }) => {
          const newGame = value.data.onUpdateGameById;

          if (newGame && game) {
            const { status, state, winner, turn } = newGame;
            setGame({ ...game, status, state, winner, turn });

            if (user) {
              user.username === turn ? playSound("pop1") : playSound("pop2");
            }
          }
        },
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [gameID]);

  useEffect(() => {
    if (game && game.status === "FINISHED" && !finished) {
      if (game.winner === null) {
        playSound("draw").then(() => {});
      } else if (user && game.winner === user.username) {
        playSound("win").then(() => {});
      } else {
        playSound("loss").then(() => {});
      }
    }
  }, [game]);

  useEffect(() => {
    initGame().then(() => {});
  }, []);

  return (
    <GradientBg>
      <SafeAreaView style={styles.container}>
        {loading && (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <ActivityIndicator color={colours.lightGreen} />
          </View>
        )}
        {game && user && (
          <>
            <View style={styles.header}>
              <Text style={styles.turn} numberOfLines={1}>
                {game.turn === user.username && isActive() && "Your Turn"}
                {game.turn === opponentUsername &&
                  isActive() &&
                  `Waiting for ${opponentUsername}`}
                {!isActive() && "Game Over"}
              </Text>
              <View style={styles.participants}>
                <View
                  style={[
                    styles.userBox,
                    game.turn === player1?.player.username &&
                      isActive() &&
                      styles.playerTurn,
                    { alignItems: "flex-end" },
                  ]}
                >
                  <Text style={styles.smallTxt}>{player1?.player.name}</Text>
                  <Text style={styles.smallTxt}>
                    {player1?.player.username}
                  </Text>
                </View>
                <Text style={[{ color: "white" }, styles.smallTxt]}>vs</Text>
                <View
                  style={[
                    styles.userBox,
                    game.turn === player2?.player.username &&
                      isActive() &&
                      styles.playerTurn,
                    { alignItems: "flex-start" },
                  ]}
                >
                  <Text style={styles.smallTxt}>{player2?.player.name}</Text>
                  <Text style={styles.smallTxt}>
                    {player2?.player.username}
                  </Text>
                </View>
              </View>
            </View>

            <Board
              state={game.state as BoardState}
              loading={playingTurn}
              disabled={
                game.turn !== user.username ||
                playingTurn !== false ||
                (game.status !== "ACTIVE" && game.status !== "REQUESTED")
              }
              size={SCREEN_WIDTH - 90} //or 60
              gameResult={gameResult}
              onCellPressed={(index) => playTurn(index as Moves)}
            />
          </>
        )}
        {game && user && game.status === "FINISHED" && (
          <View style={styles.modal}>
            <Text style={styles.modalText}>
              {game.winner === user.username && "You Won"}
              {game.winner === opponentUsername && "You Lose"}
              {game.winner === null && "It's a Draw"}
            </Text>
            <Button
              title="Play Again"
              onPress={() => {
                if (opponentUsername) {
                  navigation.replace("MultiplayerGame", {
                    invitee: opponentUsername,
                  });
                }
              }}
            />
          </View>
        )}
      </SafeAreaView>
    </GradientBg>
  );
};

export default MultiplayerGame;
