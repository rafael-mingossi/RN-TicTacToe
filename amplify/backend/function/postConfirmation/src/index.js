/* Amplify Params - DO NOT EDIT
	API_RNTICTACTOE_GRAPHQLAPIENDPOINTOUTPUT
	API_RNTICTACTOE_GRAPHQLAPIIDOUTPUT
	API_RNTICTACTOE_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const appsync = require("aws-appsync");
const gql = require("graphql-tag");
require("cross-fetch/polyfill");
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event, context, callback) => {
  const graphqlClient = new appsync.AWSAppSyncClient({
    url: process.env.API_RNTICTACTOE_GRAPHQLAPIENDPOINTOUTPUT,
    region: process.env.REGION,
    auth: {
      type: "AWS_IAM",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        sessionToken: process.env.AWS_SESSION_TOKEN,
      },
    },
    disableOffline: true,
  });

  const mutation = gql`
    mutation createPlayer(
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
      }
    }
  `;

  try {
    await graphqlClient.mutate({
      mutation,
      variables: {
        name: event.request.userAttributes.name,
        username: event.userName,
        cognitoID: event.request.userAttributes.sub,
        email: event.request.userAttributes.email,
      },
      authMode: "AWS_IAM",
    });

    callback(null, event);
  } catch (e) {
    callback(e);
  }
};