import { ReactNode, FC, useEffect } from "react";
import {
  useFonts,
  DeliusUnicase_400Regular,
  DeliusUnicase_700Bold,
} from "@expo-google-fonts/delius-unicase";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync().then((r) => console.log(r));

type AppBootstrapProps = {
  children: ReactNode;
};

const AppBootstrap: FC<AppBootstrapProps> = ({ children }) => {
  const [fontsLoaded] = useFonts({
    DeliusUnicase_400Regular,
    DeliusUnicase_700Bold,
  });

  const stopSplash = async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  };

  useEffect(() => {
    stopSplash().then((r) => {});
  }, [fontsLoaded]);

  return fontsLoaded ? <>{children}</> : null;
};
export default AppBootstrap;
