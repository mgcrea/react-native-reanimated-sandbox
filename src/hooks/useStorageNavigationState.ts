import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainerProps, NavigationState } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Linking, Platform } from "react-native";

const PERSISTENCE_KEY = "NAVIGATION_STATE_V1";
// AsyncStorage.removeItem(PERSISTENCE_KEY);

export const useStorageNavigationState = () => {
  const [isReady, setIsReady] = useState(__DEV__ ? false : true);
  const [initialState, setInitialState] = useState<NavigationState>();

  useEffect(() => {
    const restoreState = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();

        if (Platform.OS !== "web" && initialUrl == null) {
          // Only restore state if there's no deep link and we're not on web
          const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
          const state = savedStateString ? JSON.parse(savedStateString) : undefined;

          if (state !== undefined) {
            setInitialState(state);
          }
        }
      } finally {
        setIsReady(true);
      }
    };

    if (!isReady) {
      restoreState();
    }
  }, [isReady]);

  const onStateChange: NavigationContainerProps["onStateChange"] = (state) => {
    AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state));
  };

  return { isReady, initialState, onStateChange };
};
