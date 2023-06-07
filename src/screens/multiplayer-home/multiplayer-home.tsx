import { View, ScrollView } from "react-native";
import { FC, useEffect } from "react";
import styles from "./multiplayer-home.styles";
import { GradientBg, Text } from "@components";
import { useAuth } from "@contexts/auth-context";
import { colours } from "@utils";
import { getPlayer } from "./multiplayer-home.graphql";
import { API, graphqlOperation } from "aws-amplify";
import { GraphQLResult } from "@aws-amplify/api";
import { GetPlayerQuery } from "@api";
import { Logs } from "expo";
Logs.enableExpoCliLogging();

const MultiplayerHome: FC = () => {
  const { user } = useAuth();

  const fetchPlayer = async (nextToken: string | null) => {
    if (user) {
      try {
        const player = (await API.graphql(
          graphqlOperation(getPlayer, {
            username: user.username,
            limit: 1,
            sortDirection: "DESC",
            nextToken: nextToken,
          })
        )) as GraphQLResult<GetPlayerQuery>;
        console.warn("hey ->", player.data);
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    fetchPlayer(null).then(() => {});
  }, []);

  return (
    <GradientBg>
      {user ? (
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={{ color: colours.lightGreen }}>{user.username}</Text>
        </ScrollView>
      ) : (
        <View style={styles.container}>
          <Text style={{ color: colours.lightGreen }}>
            You must be logged in!
          </Text>
        </View>
      )}
    </GradientBg>
  );
};

export default MultiplayerHome;
