import { AppBootstrap } from "@components";
import { FC } from "react";
import Navigator from "@config/navigator";
import { SettingsProvider } from "@contexts/settings-context";
import { Amplify } from "aws-amplify";
import config from "../aws-exports";
import { AuthProvider } from "@contexts/auth-context";

Amplify.configure(config);

const App: FC = () => {
  return (
    <AuthProvider>
      <AppBootstrap>
        <SettingsProvider>
          <Navigator />
        </SettingsProvider>
      </AppBootstrap>
    </AuthProvider>
  );
};
export default App;
