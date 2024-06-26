import React, { FunctionComponent } from "react";
import { StyleSheet } from "react-native";
import Svg, { G, SvgProps } from "react-native-svg";
import { Size } from "src/types";
import { SvgResizableRect } from "./svg/SvgResizableRect";

export type SvgMaskProps = {
  style?: SvgProps["style"];
  imageSize: Size;
  containerSize: Size;
};

export const SvgMask: FunctionComponent<SvgMaskProps> = ({ style }) => {
  return (
    <Svg height="100%" width="100%" style={[StyleSheet.absoluteFill, style]}>
      <G>
        {/* <Circle cx={300} cy={300} r={10} fill="red" /> */}
        <SvgResizableRect
          id="foo"
          rect={{ x: 100, y: 100, width: 200, height: 100, rotation: 0.1 }}
          isActive={true}
        />
      </G>
    </Svg>
  );
};
