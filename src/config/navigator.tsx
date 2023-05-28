import { FC } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import { Home, SinglePlayerGame, Settings, Login, SignUp } from "@screens";
import { colours } from "@utils";

export type StackNavigatorParams = {
  Home: undefined;
  SinglePlayerGame: undefined;
  Settings: undefined;
  Login: undefined;
  SignUp: { username: string } | undefined;
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
  return (
    <NavigationContainer>
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
          name="SignUp"
          component={SignUp}
          options={{ headerShown: true, title: "Sign-Up" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
