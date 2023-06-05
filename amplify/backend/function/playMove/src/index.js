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

exports.handler = async (event) => {
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

  //1. Get game obj from the id and check if exists

  //2. Make sure the game is active

  //3. check if the current user is a participant in the game and that is his turn

  //4. Make sure that the index is valid (not > 8 and not already occupied)

  //5. Update the state, check if the move is a terminal one & update winner, status, turn

  //6. return the upload game
};
