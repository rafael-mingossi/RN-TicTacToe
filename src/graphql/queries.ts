/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPlayer = /* GraphQL */ `
  query GetPlayer($username: String!) {
    getPlayer(username: $username) {
      id
      cognitoID
      username
      name
      email
      createdAt
      updatedAt
      games {
        items {
          id
          createdAt
          gameID
          playerUsername
          owners
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const listPlayers = /* GraphQL */ `
  query ListPlayers(
    $username: String
    $filter: ModelPlayerFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listPlayers(
      username: $username
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        cognitoID
        username
        name
        email
        createdAt
        updatedAt
        games {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const searchPlayers = /* GraphQL */ `
  query SearchPlayers(
    $filter: SearchablePlayerFilterInput
    $sort: SearchablePlayerSortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchPlayers(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
    ) {
      items {
        id
        cognitoID
        username
        name
        email
        createdAt
        updatedAt
        games {
          nextToken
        }
      }
      nextToken
      total
    }
  }
`;
export const getGame = /* GraphQL */ `
  query GetGame($id: ID!) {
    getGame(id: $id) {
      id
      status
      owners
      initiator
      turn
      state
      winner
      createdAt
      updatedAt
      players {
        items {
          id
          createdAt
          gameID
          playerUsername
          owners
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const listGames = /* GraphQL */ `
  query ListGames(
    $filter: ModelGameFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGames(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        status
        owners
        initiator
        turn
        state
        winner
        createdAt
        updatedAt
        players {
          nextToken
        }
      }
      nextToken
    }
  }
`;
