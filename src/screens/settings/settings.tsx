import { Text, GradientBg } from "@components";
import { ReactElement } from "react";
import styles from "./settings.styles";
import { ScrollView, TouchableOpacity, View, Switch } from "react-native";
import { colours } from "@utils";
import { difficulties, useSettings } from "@contexts/settings-context";

const Settings = (): ReactElement | null => {
  const { settings, saveSetting } = useSettings();
  return (
    <GradientBg>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.field}>
          <Text style={styles.label}>Bot Difficulty</Text>
          <View style={styles.choices}>
            {Object.keys(difficulties).map((level) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    saveSetting(
                      "difficulty",
                      level as keyof typeof difficulties
                    )
                  }
                  key={level}
                  style={[
                    styles.choice,
                    {
                      backgroundColor:
                        settings?.difficulty === level
                          ? colours.lightPurple
                          : colours.lightGreen,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.choiceText,
                      {
                        color:
                          settings?.difficulty === level
                            ? colours.lightGreen
                            : colours.darkPurple,
                      },
                    ]}
                  >
                    {difficulties[level as keyof typeof difficulties]}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={[styles.field, styles.switchField]}>
          <Text style={styles.label}>Sounds</Text>
          <Switch
            trackColor={{ false: colours.purple, true: colours.lightPurple }}
            thumbColor={colours.lightGreen}
            ios_backgroundColor={colours.purple}
            value={settings?.sounds}
            onValueChange={() => saveSetting("sounds", !settings?.sounds)}
          />
        </View>

        <View style={[styles.field, styles.switchField]}>
          <Text style={styles.label}>Haptics/Vibrations</Text>
          <Switch
            trackColor={{ false: colours.purple, true: colours.lightPurple }}
            thumbColor={colours.lightGreen}
            ios_backgroundColor={colours.purple}
            value={settings?.haptics}
            onValueChange={() => saveSetting("haptics", !settings?.haptics)}
          />
        </View>
      </ScrollView>
    </GradientBg>
  );
};

export default Settings;
