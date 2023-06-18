import { ReactNode, FC, useEffect, useState } from "react";
import {
  useFonts,
  DeliusUnicase_400Regular,
  DeliusUnicase_700Bold,
} from "@expo-google-fonts/delius-unicase";
import * as SplashScreen from "expo-splash-screen";
import { useAuth } from "@contexts/auth-context";
import { Auth, Hub } from "aws-amplify";
import { initNotifications } from "@utils";

SplashScreen.preventAutoHideAsync().then(() => {});

type AppBootstrapProps = {
  children: ReactNode;
};

const AppBootstrap: FC<AppBootstrapProps> = ({ children }) => {
  const { setUser } = useAuth();
  const [fontsLoaded] = useFonts({
    DeliusUnicase_400Regular,
    DeliusUnicase_700Bold,
  });
  const [authLoaded, setAuthLoaded] = useState(false);

  const stopSplash = async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  };

  useEffect(() => {
    stopSplash().then(() => {});
  }, [fontsLoaded]);

  useEffect(() => {
    async function checkCurrentUser() {
      try {
        const user = await Auth.currentAuthenticatedUser();
        setUser(user);
        // @ts-ignore
        initNotifications();
      } catch (e) {
        setUser(null);
      }

      setAuthLoaded(true);
    }

    checkCurrentUser().then(() => {});

    function hubListener(hubData: any) {
      const { data, event } = hubData.payload;

      switch (event) {
        case "signOut":
          setUser(null);
          break;

        case "signIn":
          setUser(data);
          // @ts-ignore
          initNotifications();
          break;

        default:
          break;
      }
    }

    Hub.listen("auth", hubListener);
  }, []);

  return fontsLoaded && authLoaded ? <>{children}</> : null;
};
export default AppBootstrap;
