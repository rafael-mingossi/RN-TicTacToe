import { FC, useEffect, useState, useRef } from "react";
import {
  NavigationContainer,
  NavigationContainerRef,
  ParamListBase,
  StackActions,
} from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import {
  Home,
  SinglePlayerGame,
  Settings,
  Login,
  SignUp,
  MultiplayerHome,
  MultiplayerGame,
} from "@screens";
import { colours } from "@utils";
import { useAuth } from "@contexts/auth-context";
import * as Notifications from "expo-notifications";

export type StackNavigatorParams = {
  Home: undefined;
  SinglePlayerGame: undefined;
  Settings: undefined;
  Login: { redirect: keyof StackNavigatorParams } | undefined;
  MultiplayerHome: undefined;
  SignUp: { username: string } | undefined;
  MultiplayerGame:
    | { gameID: string; invitee?: undefined }
    | { invitee: string; gameID?: undefined };
};

const Stack = createNativeStackNavigator<StackNavigatorParams>();

const navigationOptions: NativeStackNavigationOptions = {
  headerStyle: {
    backgroundColor: colours.purple,
  },
  headerShadowVisible: false,
  headerBackTitleVisible: false,
  headerBackTitle: "",
  headerTintColor: colours.lightGreen,
  headerLargeTitle: false,
  headerTitleStyle: {
    fontFamily: "DeliusUnicase_700Bold",
    fontSize: 20,
  },
  headerBackTitleStyle: {
    fontFamily: "DeliusUnicase_400Regular",
    fontSize: 14,
  },
};
const Navigator: FC = () => {
  const { user } = useAuth();
  const navigatorRef =
    useRef<NavigationContainerRef<StackNavigatorParams> | null>(null);
  const [isNavigatorReady, setIsNavigatorReady] = useState(false);

  useEffect(() => {
    if (user && isNavigatorReady) {
      //HANDLE CLICK IN PUSH NOTIFICATION
      const subscription =
        Notifications.addNotificationResponseReceivedListener((response) => {
          console.log(response);
          const gameID = response.notification.request.content.data.gameId;

          //IN CASE USER IS ALREADY IN MULTI PLAYER GAME SCREEN IT WILL NEED TO PUSH OR REPLACE BUT NOT NAVIGATE
          if (
            navigatorRef.current?.getCurrentRoute()?.name === "MultiplayerGame"
          ) {
            navigatorRef.current?.dispatch(
              //Using replace, will make the user return to the home page when pressing back
              //If the user needs to return to te previous page, replace should be changed to push
              StackActions.replace("MultiplayerGame", { gameID })
            );
          } else {
            navigatorRef.current?.navigate("MultiplayerGame", { gameID });
          }
        });

      //UNSUBSCRIBE FROM THE EVENT
      return () => {
        subscription.remove();
      };
    }
  }, [user, isNavigatorReady]);

  return (
    <NavigationContainer
      ref={navigatorRef}
      onReady={() => {
        setIsNavigatorReady(true);
      }}
    >
      <Stack.Navigator screenOptions={navigationOptions}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SinglePlayerGame"
          component={SinglePlayerGame}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="MultiplayerHome"
          component={MultiplayerHome}
          options={{ headerShown: true, title: "Multiplayer" }}
        />
        <Stack.Screen
          name="MultiplayerGame"
          component={MultiplayerGame}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: true, title: "Sign-Up" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
