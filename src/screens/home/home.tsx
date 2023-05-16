import { View, ScrollView, Image, TouchableOpacity } from "react-native";
import styles from "./home.styles";
import { FC } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackNavigatorParams } from "@config/navigator";
import { GradientBg, Text } from "@components";

type HomeProps = {
  navigation: NativeStackNavigationProp<StackNavigatorParams, "Home">;
};

const Home: FC<HomeProps> = ({ navigation }) => {
  return (
    <GradientBg>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={require("@assets/logo.png")} style={styles.logo} />
        <View style={styles.buttons}>
          <TouchableOpacity
            style={{
              backgroundColor: "#dafaf7",
              paddingVertical: 20,
              paddingHorizontal: 25,
              borderRadius: 30,
            }}
          >
            <Text style={{ fontSize: 18, color: "#221a36" }}>
              Single Player
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </GradientBg>
  );
};

export default Home;
