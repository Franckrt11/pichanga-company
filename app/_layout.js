import { Slot } from "expo-router";
import { useCallback, useState } from "react";
import { Provider } from "../src/context/auth";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "../src/models/useFont";

SplashScreen.preventAutoHideAsync();

const Root = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  const LoadFonts = async () => {
    await useFonts();
    setAppIsReady(true);
  };

  LoadFonts();

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <Provider onLayout={onLayoutRootView}>
      <Slot />
    </Provider>
  );
};

export default Root;
