import { useNavigation, type NavigationProp } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { FunctionComponent } from "react";
import { CancelAnimationScreen, HomeScreen, ReadOnlyRefScreen } from "src/screens";

export type RootStackParamList = {
  HomeScreen: undefined;
  CancelAnimation: undefined;
  ReadOnlyRef: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
export const useRootNavigation = useNavigation<NavigationProp<RootStackParamList>>;

export const RootStackNavigator: FunctionComponent = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        presentation: "card",
        // headerShown: false,
        gestureEnabled: false,
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="CancelAnimation" component={CancelAnimationScreen} />
      <Stack.Screen name="ReadOnlyRef" component={ReadOnlyRefScreen} />
    </Stack.Navigator>
  );
};
