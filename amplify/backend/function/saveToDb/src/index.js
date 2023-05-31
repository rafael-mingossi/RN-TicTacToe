/* Amplify Params - DO NOT EDIT
	API_RNTICTACTOE_GRAPHQLAPIIDOUTPUT
	API_RNTICTACTOE_PLAYERTABLE_ARN
	API_RNTICTACTOE_PLAYERTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const aws = require("aws-sdk");
const ddb = new aws.DynamoDB();

exports.handler = async (event, context) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  let date = new Date();

  if (event.request.userAttributes.sub) {
    let params = {
      Item: {
        __typename: { S: "Player" },
        name: { S: event.request.userAttributes.name },
        username: { S: event.userName },
        cognitoID: { S: event.request.userAttributes.sub },
        email: { S: event.request.userAttributes.email },
        createdAt: { S: date.toISOString() },
        updatedAt: { S: date.toISOString() },
      },
      TableName: process.env.API_RNTICTACTOE_PLAYERTABLE_NAME,
    };

    // Call DynamoDB
    try {
      await ddb.putItem(params).promise();
      console.log("Success");
    } catch (err) {
      console.log("Error", err);
    }

    console.log("Success: Everything executed correctly");
    context.done(null, event);
  } else {
    // Nothing to do, the user's email ID is unknown
    console.log("Error: Nothing was written to DynamoDB");
    context.done(null, event);
  }
};
