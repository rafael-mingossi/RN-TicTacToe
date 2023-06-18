import * as Notifications from "expo-notifications";
import Device from "expo-device";
import { Platform } from "react-native";
import gql from "graphql-tag";
import { API, graphqlOperation } from "aws-amplify";

const addExpoToken = gql`
  mutation addExpoToken($token: String!) {
    addExpoToken(token: $token) {
      playerUsername
      token
    }
  }
`;

const initNotifications = async (): Promise<void> => {
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      return;
    }

    const tokenRes = await Notifications.getExpoPushTokenAsync();

    try {
      await API.graphql(
        graphqlOperation(addExpoToken, {
          token: tokenRes.data,
        })
      );
    } catch (e) {
      console.log(e);
    }

    //FOR ANDROID ONLY, ADDING A CHANNEL
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
      });
    }
  }
};

export default initNotifications();
