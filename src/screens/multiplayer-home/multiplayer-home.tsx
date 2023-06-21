import {
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { FC, useEffect, useState } from "react";
import styles from "./multiplayer-home.styles";
import { Button, GradientBg, Text } from "@components";
import { useAuth } from "@contexts/auth-context";
import { colours } from "@utils";
import { getPlayer, PlayerGameType } from "./multiplayer-home.graphql";
import { API, graphqlOperation } from "aws-amplify";
import { GraphQLResult } from "@aws-amplify/api";
import { GetPlayerQuery } from "@api";
import GameItem from "./game-item";
import Modal from "react-native-modal";
import PlayerModal from "./players-modal/players-modal";
import { Logs } from "expo";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackNavigatorParams } from "@config/navigator";
import * as Notifications from "expo-notifications";
Logs.enableExpoCliLogging();

type MultiplayerHomeScreenNavigationProp = NativeStackNavigationProp<
  StackNavigatorParams,
  "MultiplayerHome"
>;
type MultiplayerHomeProps = {
  navigation: MultiplayerHomeScreenNavigationProp;
};

const MultiplayerHome: FC<MultiplayerHomeProps> = ({ navigation }) => {
  const { user } = useAuth();

  const [playerGames, setPlayerGames] = useState<PlayerGameType[] | null>(null);
  const [nextToken, setNextToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [playersModal, setPlayersModal] = useState(false);

  const fetchPlayer = async (nextToken: string | null, init?: boolean) => {
    if (user) {
      setLoading(true);

      if (nextToken === null && !init) {
        setRefreshing(true);
      }
      try {
        const player = (await API.graphql(
          graphqlOperation(getPlayer, {
            username: user.username,
            limit: 2,
            sortDirection: "DESC",
            nextToken: nextToken,
          })
        )) as GraphQLResult<GetPlayerQuery>;

        if (player.data?.getPlayer?.games) {
          const newPlayerGames = player.data.getPlayer.games.items || [];
          setPlayerGames(
            !playerGames || nextToken === null
              ? newPlayerGames
              : [...playerGames, ...newPlayerGames]
          );
          setNextToken(player.data.getPlayer.games.nextToken);
          await Notifications.setBadgeCountAsync(0);
        }
      } catch (e) {
        console.log(e);
      }
    }
    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => {
    fetchPlayer(null, true).then(() => {});
  }, []);

  return (
    <GradientBg>
      {user ? (
        <>
          <FlatList
            contentContainerStyle={styles.container}
            data={playerGames}
            renderItem={({ item }) => (
              <GameItem
                onPress={() => {
                  if (item?.game) {
                    navigation.navigate("MultiplayerGame", {
                      gameID: item?.game.id,
                    });
                  }
                }}
                playerGame={item}
              />
            )}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => fetchPlayer(null)}
                tintColor={colours.lightGreen}
              />
            }
            keyExtractor={(playerGame) =>
              playerGame ? playerGame.game.id : `${new Date().getTime()}`
            }
            ListFooterComponent={() => {
              if (!nextToken) return null;
              return (
                <Button
                  style={{ marginTop: 20 }}
                  loading={loading && !refreshing}
                  title="Load More"
                  onPress={() => fetchPlayer(nextToken)}
                />
              );
            }}
            ListEmptyComponent={() => {
              if (loading) {
                return (
                  <View style={styles.loading}>
                    <ActivityIndicator color={colours.lightGreen} />
                  </View>
                );
              }
              return (
                <View>
                  <Text style={{ color: colours.lightGreen }}>
                    No Games Found
                  </Text>
                </View>
              );
            }}
          />
          <TouchableOpacity
            style={styles.newGameBtn}
            onPress={() => setPlayersModal(true)}
          >
            <Text style={styles.newGameBtnTxt}>New Game</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.container}>
          <Text style={{ color: colours.lightGreen }}>
            You must be logged in!
          </Text>
        </View>
      )}
      <Modal
        style={{ margin: 0 }}
        isVisible={playersModal}
        avoidKeyboard
        backdropOpacity={0.75}
        onBackButtonPress={() => setPlayersModal(false)}
        onBackdropPress={() => setPlayersModal(false)}
      >
        <PlayerModal
          onItemPress={(username) => {
            setPlayersModal(false);
            navigation.navigate("MultiplayerGame", { invitee: username });
          }}
        />
      </Modal>
    </GradientBg>
  );
};

export default MultiplayerHome;
