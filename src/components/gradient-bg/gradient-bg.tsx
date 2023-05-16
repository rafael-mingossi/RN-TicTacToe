import { FC, ReactNode } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

type GradientBgProps = {
  children: ReactNode;
};

const GradientBg: FC<GradientBgProps> = ({ children }) => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="light" />
      <LinearGradient
        colors={["#120318", "#221a30"]}
        style={{ position: "absolute", left: 0, right: 0, bottom: 0, top: 0 }}
      />
      {children}
    </View>
  );
};

export default GradientBg;
