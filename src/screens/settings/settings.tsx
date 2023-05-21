import { Text, GradientBg } from "@components";
import { FC } from "react";
import styles from "./settings.styles";
import { ScrollView } from "react-native";

const Settings: FC = () => {
  return (
    <GradientBg>
      <ScrollView contentContainerStyle={styles.container}>
        <Text>SETTINGS</Text>
      </ScrollView>
    </GradientBg>
  );
};

export default Settings;
