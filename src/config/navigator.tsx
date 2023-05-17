import { FC } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home, SinglePlayerGame } from "@screens";

export type StackNavigatorParams = {
  Home: undefined;
  SinglePlayerGame: undefined;
};

const Stack = createNativeStackNavigator<StackNavigatorParams>();
const Navigator: FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
