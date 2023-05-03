import { Stack, Slot } from "expo-router";
import { Provider } from "../context/auth";

const Root = () => {
  return (
    <Provider>
      <Slot />
    </Provider>
  );
};

export default Root;
