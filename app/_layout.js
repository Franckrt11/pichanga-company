import { Slot } from "expo-router";
import { Provider } from "../src/context/auth";

const Root = () => {
  return (
    <Provider>
      <Slot />
    </Provider>
  );
};

export default Root;
