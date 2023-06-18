import * as Notifications from "expo-notifications";
import Device from "expo-device";
import gql from "graphql-tag";
import { API, Auth, graphqlOperation } from "aws-amplify";

const signOut = async (): Promise<void> => {
  if (Device.isDevice) {
    const tokenRes = await Notifications.getExpoPushTokenAsync();
    const deleteExpoToken = gql`
      mutation deleteExpoToken($token: String!) {
        deleteExpoToken(input: { token: $token }) {
          token
        }
      }
    `;

    await API.graphql(
      graphqlOperation(deleteExpoToken, {
        token: tokenRes.data,
      })
    );
  }

  await Auth.signOut();
};

export default signOut;
