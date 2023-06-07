import { View, ScrollView, Image } from "react-native";
import styles from "./home.styles";
import { FC, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackNavigatorParams } from "@config/navigator";
import { GradientBg, Button, Text } from "@components";
import { useAuth } from "@contexts/auth-context";
import { Auth } from "aws-amplify";

type HomeProps = {
  navigation: NativeStackNavigationProp<StackNavigatorParams, "Home">;
};

const Home: FC<HomeProps> = ({ navigation }) => {
  const { user } = useAuth();
  const [signOutLoad, setSignOutLoad] = useState(false);

  return (
    <GradientBg>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={require("@assets/logo.png")} style={styles.logo} />
        <View style={styles.buttons}>
          <Button
            onPress={() => navigation.navigate("SinglePlayerGame")}
            style={styles.button}
            title={"Single Player"}
          />
          <Button
            onPress={() => {
              if (user) {
                navigation.navigate("MultiplayerHome");
              } else {
                navigation.navigate("Login", {
                  redirect: "MultiplayerHome",
                });
              }
            }}
            style={styles.button}
            title={"Multiplayer"}
          />
          <Button
            loading={signOutLoad}
            style={styles.button}
            title={user ? "Logout" : "Login"}
            onPress={async () => {
              if (user) {
                setSignOutLoad(true);
                try {
                  await Auth.signOut();
                } catch (e) {
                  console.log(e);
                }
                setSignOutLoad(false);
              } else {
                navigation.navigate("Login");
              }
            }}
          />
          <Button
            onPress={() => navigation.navigate("Settings")}
            style={styles.button}
            title={"Settings"}
          />
          {user && (
            <Text weight="400" style={styles.loginText}>
              Logged in as: <Text weight="700">{user?.username}</Text>
            </Text>
          )}
        </View>
      </ScrollView>
    </GradientBg>
  );
};

export default Home;
