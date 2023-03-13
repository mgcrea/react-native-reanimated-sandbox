import React, { FunctionComponent } from "react";
import { Button, View } from "react-native";
import { useRootNavigation } from "src/navigators";

export const HomeScreen: FunctionComponent = () => {
  const navigation = useRootNavigation();
  return (
    <View style={[{ flex: 1 }]}>
      <Button
        title="CancelAnimation"
        onPress={() => {
          navigation.navigate("CancelAnimation");
        }}
      />
      <Button
        title="ReadOnlyRef"
        onPress={() => {
          navigation.navigate("ReadOnlyRef");
        }}
      />
    </View>
  );
};
