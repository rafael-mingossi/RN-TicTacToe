/* Amplify Params - DO NOT EDIT
	API_RNTICTACTOE_GRAPHQLAPIENDPOINTOUTPUT
	API_RNTICTACTOE_GRAPHQLAPIIDOUTPUT
	API_RNTICTACTOE_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

import { default as fetch, Request } from "node-fetch";

const GRAPHQL_ENDPOINT = process.env.API_RNTICTACTOE_GRAPHQLAPIENDPOINTOUTPUT;
const GRAPHQL_API_KEY = process.env.API_RNTICTACTOE_GRAPHQLAPIKEYOUTPUT;

const query = /* GraphQL */ `
  mutation CREATE_PLAYER(
    $name: String!
    $username: String!
    $cognitoID: String!
    $email: AWSEmail!
  ) {
    createPlayer(
      input: {
        name: $name
        username: $username
        cognitoID: $cognitoID
        email: $email
      }
    ) {
      id
      name
    }
  }
`;

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
export const handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  const variables = {
    input: {
      name: event.request.userAttributes.name,
      username: event.userName,
      cognitoID: event.request.userAttributes.sub,
      email: event.request.userAttributes.email,
    },
  };

  /** @type {import('node-fetch').RequestInit} */
  const options = {
    method: "POST",
    headers: {
      "x-api-key": GRAPHQL_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  };

  const request = new Request(GRAPHQL_ENDPOINT, options);
  console.log("req->>", request);

  let statusCode = 200;
  let body;
  let response;

  try {
    response = await fetch(request);
    console.log("res->>", response);
    body = await response.json();
    if (body.errors) statusCode = 400;
  } catch (error) {
    statusCode = 400;
    body = {
      errors: [
        {
          status: response.status,
          message: error.message,
          stack: error.stack,
        },
      ],
    };
  }

  return {
    statusCode,
    body: JSON.stringify(body),
  };
};
