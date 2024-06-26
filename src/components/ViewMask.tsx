import React, { FunctionComponent } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { Size } from "src/types";
import { ViewResizableRect } from "./view/ViewResizableRect";

export type ViewMaskkProps = {
  style?: StyleProp<ViewStyle>;
  imageSize: Size;
  containerSize: Size;
};
export const ViewMask: FunctionComponent<ViewMaskkProps> = ({ style }) => {
  return (
    <View style={[StyleSheet.absoluteFill, style]}>
      <ViewResizableRect
        id="foo"
        rect={{ x: 100, y: 100, width: 200, height: 100, rotation: 0.1 }}
        isActive
      />
    </View>
  );
};
