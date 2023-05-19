import { Slot } from "expo-router";
import { useState } from 'react';
import { Provider } from "../src/context/auth";
import AppLoading from "expo-app-loading";
import { useFonts } from "../src/models/useFont";

const Root = () => {
  const [isLoading, setIsLoading] = useState(false);

  const LoadFonts = async () => {
    await useFonts();
  };

  if (!isLoading) {
    return (
      <AppLoading
        startAsync={LoadFonts}
        onFinish={() => setIsLoading(true)}
        onError={() => {}}
      />
    );
  }

  return (
    <Provider>
      <Slot />
    </Provider>
  );
};

export default Root;
