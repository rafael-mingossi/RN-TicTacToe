import { AppBootstrap } from "@components";
import { FC } from "react";
import Navigator from "@config/navigator";

const App: FC = () => {
  return (
    <AppBootstrap>
      <Navigator />
    </AppBootstrap>
  );
};
export default App;
