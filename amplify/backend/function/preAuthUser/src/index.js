/* Amplify Params - DO NOT EDIT
	API_RNTICTAC_GRAPHQLAPIENDPOINTOUTPUT
	API_RNTICTAC_GRAPHQLAPIIDOUTPUT
	API_RNTICTAC_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const appsync = require("aws-appsync");
const gql = require("graphql-tag");
require("cross-fetch/polyfill");
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event, context, callback) => {
  console.log("preAuth ->", event);

  const graphqlClient = new appsync.AWSAppSyncClient({
    url: process.env.API_RNTICTAC_GRAPHQLAPIENDPOINTOUTPUT,
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

  const query = gql`
    query getPlayer($username: String!) {
      getPlayer(username: $username) {
        id
      }
    }
  `;

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
    const response = await graphqlClient.query({
      query,
      variables: {
        username: event.userName,
      },
    });

    if (response.data.getPlayer) {
      callback(null, event);
    } else {
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
    }
  } catch (error) {
    callback(error);
  }
};
