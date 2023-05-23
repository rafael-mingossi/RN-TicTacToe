import { AppBootstrap } from "@components";
import { FC } from "react";
import Navigator from "@config/navigator";
import { SettingsProvider } from "@contexts/settings-context";
import { Amplify } from "aws-amplify";
import config from "../aws-exports";

Amplify.configure(config);

const App: FC = () => {
  return (
    <AppBootstrap>
      <SettingsProvider>
        <Navigator />
      </SettingsProvider>
    </AppBootstrap>
  );
};
export default App;
