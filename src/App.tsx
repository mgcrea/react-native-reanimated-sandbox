import { NavigationContainer } from "@react-navigation/native";
import React, { FunctionComponent } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useStorageNavigationState } from "./hooks";
import { RootStackNavigator } from "./navigators";

export const App: FunctionComponent = () => {
  const { isReady, initialState, onStateChange } = useStorageNavigationState();
  if (!isReady) {
    return null;
  }
  return (
    // <SafeAreaView style={{ flex: 1, backgroundColor: "azure" }}>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer initialState={initialState} onStateChange={onStateChange}>
        <RootStackNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
    // </SafeAreaView>
  );
};
