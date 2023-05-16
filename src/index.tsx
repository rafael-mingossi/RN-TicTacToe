import { Text, AppBootstrap } from "@components";
import { FC } from "react";

const App: FC = () => {
  return (
    <AppBootstrap>
      <Text style={{ fontSize: 35 }} weight={"700"}>
        Hello World
      </Text>
    </AppBootstrap>
  );
};
export default App;
