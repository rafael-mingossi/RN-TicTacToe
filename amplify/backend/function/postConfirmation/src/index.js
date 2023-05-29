/* Amplify Params - DO NOT EDIT
	API_RNTICTACTOE_GRAPHQLAPIENDPOINTOUTPUT
	API_RNTICTACTOE_GRAPHQLAPIIDOUTPUT
	API_RNTICTACTOE_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event, context, callback) => {
  console.log("event", event);
  console.log("context", context);
  console.log("env", process.env);
  callback(null, event);
};
