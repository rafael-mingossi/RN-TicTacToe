import { View } from "react-native";
import { GradientBg, Text } from "@components";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { StackNavigatorParams } from "@config/navigator";
import { getGame, startGame, playMove } from "./multiplayer-game.graphql";
import { GraphQLResult } from "@aws-amplify/api";
import { getGameQuery, startGameMutation } from "@api";

import styles from "./multiplayer-game.styles";
import { FC, useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";

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
  const { gameID: existingGameID, invitee } = route.params;
  const [gameID, setGameID] = useState<string | null>(null);
  const [game, setGame] = useState<GameType | null>(null);
  const [loading, setLoading] = useState(false);

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
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    initGame().then(() => {});
  }, []);
  return (
    <GradientBg>
      <View style={styles.container}>
        <Text>GAME</Text>
      </View>
    </GradientBg>
  );
};

export default MultiplayerGame;
