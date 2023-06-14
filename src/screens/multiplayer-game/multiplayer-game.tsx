import { View, ActivityIndicator, Alert } from "react-native";
import { GradientBg, Text, Board } from "@components";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { StackNavigatorParams } from "@config/navigator";
import { getGame, startGame, playMove } from "./multiplayer-game.graphql";
import { GraphQLResult } from "@aws-amplify/api";
import { getGameQuery, playMoveMutation, startGameMutation } from "@api";

import styles from "./multiplayer-game.styles";
import { FC, useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { BoardState, colours, Moves, getErrorMessage } from "@utils";
import { useAuth } from "@contexts/auth-context";

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

const MultiplayerGame: FC<MultiplayerGameProps> = ({ navigation, route }) => {
  const { user } = useAuth();
  const { gameID: existingGameID, invitee } = route.params;
  const [gameID, setGameID] = useState<string | null>(null);
  const [game, setGame] = useState<GameType | null>(null);
  const [loading, setLoading] = useState(false);
  const [playingTurn, setPlayingTurn] = useState<Moves | false>(false);

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
    initGame().then(() => {});
  }, []);
  return (
    <GradientBg>
      {loading && (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator color={colours.lightGreen} />
        </View>
      )}
      {game && user && (
        <Board
          state={game.state as BoardState}
          loading={playingTurn}
          disabled={game.turn !== user.username || playingTurn !== false}
          size={300}
          onCellPressed={(index) => playTurn(index as Moves)}
        />
      )}
    </GradientBg>
  );
};

export default MultiplayerGame;
