import { StyleSheet, View } from "react-native";
import { ReactNode, FC } from "react";
import {
  useFonts,
  DeliusUnicase_400Regular,
  DeliusUnicase_700Bold,
} from "@expo-google-fonts/delius-unicase";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";

SplashScreen.preventAutoHideAsync().then((r) => console.log(r));

type AppBootstrapProps = {
  children: ReactNode;
};

const AppBootstrap: FC<AppBootstrapProps> = ({ children }) => {
  const [fontsLoaded] = useFonts({
    DeliusUnicase_400Regular,
    DeliusUnicase_700Bold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      {fontsLoaded ? <>{children}</> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ff0",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default AppBootstrap;
