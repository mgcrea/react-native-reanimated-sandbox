import { type ComponentProps } from "react";
import Animated, { createAnimatedPropAdapter, processColor } from "react-native-reanimated";
import { Circle, G, Line, Path, Polygon, Rect } from "react-native-svg";

export const AnimatedG = Animated.createAnimatedComponent(G);
export type AnimatedGProps = ComponentProps<typeof AnimatedG>;

export const AnimatedCircle = Animated.createAnimatedComponent(Circle);
export type AnimatedCircleProps = ComponentProps<typeof AnimatedCircle>;

export const AnimatedRect = Animated.createAnimatedComponent(Rect);
export type AnimatedRectProps = ComponentProps<typeof AnimatedRect>;

export const AnimatedLine = Animated.createAnimatedComponent(Line);
export type AnimatedLineProps = ComponentProps<typeof AnimatedLine>;

export const AnimatedPath = Animated.createAnimatedComponent(Path);
export type AnimatedPathProps = ComponentProps<typeof AnimatedPath>;

export const AnimatedPolygon = Animated.createAnimatedComponent(Polygon);
export type AnimatedPolygonProps = ComponentProps<typeof AnimatedPolygon>;

export const svgAdapter = createAnimatedPropAdapter(
  (props) => {
    if (Object.keys(props).includes("fill")) {
      props.fill = { type: 0, payload: processColor(props.fill) };
    }
    if (Object.keys(props).includes("stroke")) {
      props.stroke = { type: 0, payload: processColor(props.stroke) };
    }
  },
  ["fill", "stroke"],
);
