import { GradientBg, Text, TextInput } from "@components";
import {
  View,
  FlatList,
  TextInput as NativeTextInput,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { API, graphqlOperation } from "aws-amplify";
import { searchPlayers } from "../multiplayer-home.graphql";
import { GraphQLResult } from "@aws-amplify/api";
import { searchPlayersQuery } from "@api";
import { useEffect, useRef, useState } from "react";
import { colours } from "@utils";
import styles from "./players-modal.styles";

type PlayersListType = Exclude<
  searchPlayersQuery["searchPlayers"],
  null
>["items"];

const PlayersModal = () => {
  const [players, setPlayers] = useState<PlayersListType | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<NativeTextInput | null>(null);

  const fetchPlayers = async (searchString: string) => {
    setLoading(true);
    setSubmittedQuery(searchString);
    try {
      const players = (await API.graphql(
        graphqlOperation(searchPlayers, { limit: 10, searchString })
      )) as GraphQLResult<searchPlayersQuery>;

      if (players.data?.searchPlayers) {
        setPlayers(players.data?.searchPlayers.items);
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 200);
  }, []);

  return (
    <View style={styles.modalContainer}>
      <GradientBg>
        <View style={styles.searchContainer}>
          <TextInput
            value={searchQuery}
            onSubmitEditing={() => fetchPlayers(searchQuery)}
            onChangeText={(text) => setSearchQuery(text)}
            ref={inputRef}
            style={{
              borderBottomWidth: 0,
              backgroundColor: colours.darkPurple,
            }}
            placeholder="Search by username or name"
            returnKeyType="search"
          />
        </View>
        <View style={{ flex: 1 }}>
          {loading ? (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ActivityIndicator color={colours.lightGreen} />
            </View>
          ) : (
            <FlatList
              contentContainerStyle={{ padding: 20 }}
              data={players}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity style={styles.playerItem}>
                    <Text
                      style={{
                        color: colours.lightGreen,
                        fontSize: 17,
                        fontWeight: "700",
                      }}
                    >
                      {item?.name}
                    </Text>
                    <Text
                      style={{ color: colours.lightGreen, fontWeight: "400" }}
                    >
                      {item?.username}
                    </Text>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(player) =>
                player?.username || `${new Date().getTime()}`
              }
              ListEmptyComponent={() => {
                return (
                  <View>
                    <Text style={{ color: colours.lightGreen }}>
                      {submittedQuery ? "No players found" : ""}
                    </Text>
                  </View>
                );
              }}
            />
          )}
        </View>
      </GradientBg>
    </View>
  );
};

export default PlayersModal;
