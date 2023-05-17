import { View, ScrollView, Image, TouchableOpacity } from "react-native";
import styles from "./home.styles";
import { FC } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackNavigatorParams } from "@config/navigator";
import { GradientBg, Button } from "@components";

type HomeProps = {
  navigation: NativeStackNavigationProp<StackNavigatorParams, "Home">;
};

const Home: FC<HomeProps> = ({ navigation }) => {
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
          <Button style={styles.button} title={"Multiplayer"} />
          <Button style={styles.button} title={"Login"} />
          <Button style={styles.button} title={"Settings"} />
        </View>
      </ScrollView>
    </GradientBg>
  );
};

export default Home;
