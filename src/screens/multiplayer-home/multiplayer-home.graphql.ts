import gql from "graphql-tag";
import { GetPlayerQuery } from "@api";

export const getPlayer = gql`
  query GetPlayer(
    $username: String!
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    getPlayer(username: $username) {
      id
      games(
        limit: $limit
        nextToken: $nextToken
        sortDirection: $sortDirection
      ) {
        items {
          game {
            id
            initiator
            owners
            status
            turn
            winner
            players {
              items {
                player {
                  username
                  name
                }
              }
            }
          }
        }
        nextToken
      }
    }
  }
`;

export const searchPlayers = gql`
  query searchPlayers($limit: Int, $nextToken: String, $searchString: String) {
    searchPlayers(
      limit: $limit
      nextToken: $nextToken
      filter: {
        or: [
          { username: { matchPhrasePrefix: $searchString } }
          { name: { matchPhrasePrefix: $searchString } }
        ]
      }
    ) {
      items {
        name
        username
      }
      nextToken
    }
  }
`;

//This will exclude NULL from the response, then we can type the response to the state
export type PlayerGamesType = Exclude<
  Exclude<GetPlayerQuery["getPlayer"], null>["games"],
  null
>["items"];
export type PlayerGameType = Exclude<PlayerGamesType, null>[0];
