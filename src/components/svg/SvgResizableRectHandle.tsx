import { FunctionComponent, useCallback, useMemo } from "react";
import { GestureResponderEvent } from "react-native";
import { useAnimatedProps, useDerivedValue } from "react-native-reanimated";
import { SharedRect } from "src/hooks";
import { AnimatedCircle } from "./Animated";

export type SvgResizableRectHandleProps = {
  id: string;
  rect: SharedRect;
  size?: number;
  isActive?: boolean;
  onPressIn?: (ev: GestureResponderEvent, id: string) => void;
};
export const SvgResizableRectHandle: FunctionComponent<SvgResizableRectHandleProps> = ({
  size = 16,
  id,
  rect,
  isActive,
  onPressIn,
}) => {
  const handle = useMemo(
    () => SVG_RESIZEABLE_RECT_HANDLES.find((handle) => handle.id === id),
    [id],
  );

  const x = useDerivedValue(() => handle?.x(rect) ?? 0);
  const y = useDerivedValue(() => handle?.y(rect) ?? 0);
  const animatedCircleProps = useAnimatedProps(() => {
    return {
      cx: x.value,
      cy: y.value,
      r: size / 2,
    };
  });

  const handlePressIn = useCallback(
    (event: GestureResponderEvent) => {
      const { locationX, locationY } = event.nativeEvent;
      // console.log(event.nativeEvent.target);
      // console.log({ id, locationX, locationY, x: origin.x.value, y: origin.y.value });
      if (onPressIn) {
        onPressIn(event, id);
      }
    },
    [id, onPressIn],
  );

  return (
    <AnimatedCircle
      animatedProps={animatedCircleProps}
      fill={isActive ? "rgba(0, 0, 255, .8)" : "rgba(255, 255, 255, .8)"}
      onPressIn={handlePressIn}
    />
  );
};

type RectHandle = {
  id: string;
  cursor: string;
  x: (rect: SharedRect) => number;
  y: (rect: SharedRect) => number;
};

export const SVG_RESIZEABLE_RECT_HANDLES: RectHandle[] = [
  {
    id: "top-left",
    cursor: "nwse-resize",
    x: (rect) => {
      "worklet";
      return rect.x.value;
    },
    y: (rect) => {
      "worklet";
      return rect.y.value;
    },
  },
  {
    id: "top-right",
    cursor: "nesw-resize",
    x: (rect) => {
      "worklet";
      return rect.x.value + rect.width.value;
    },
    y: (rect) => {
      "worklet";
      return rect.y.value;
    },
  },
  {
    id: "bottom-left",
    cursor: "nesw-resize",
    x: (rect) => {
      "worklet";
      return rect.x.value;
    },
    y: (rect) => {
      "worklet";
      return rect.y.value + rect.height.value;
    },
  },
  {
    id: "bottom-right",
    cursor: "nwse-resize",
    x: (rect) => {
      "worklet";
      return rect.x.value + rect.width.value;
    },
    y: (rect) => {
      "worklet";
      return rect.y.value + rect.height.value;
    },
  },
  {
    id: "top-center",
    cursor: "ns-resize",
    x: (rect) => {
      "worklet";
      return rect.x.value + rect.width.value / 2;
    },
    y: (rect) => {
      "worklet";
      return rect.y.value;
    },
  },
  {
    id: "bottom-center",
    cursor: "ns-resize",
    x: (rect) => {
      "worklet";
      return rect.x.value + rect.width.value / 2;
    },
    y: (rect) => {
      "worklet";
      return rect.y.value + rect.height.value;
    },
  },
  {
    id: "left-center",
    cursor: "ew-resize",
    x: (rect) => {
      "worklet";
      return rect.x.value;
    },
    y: (rect) => {
      "worklet";
      return rect.y.value + rect.height.value / 2;
    },
  },
  {
    id: "right-center",
    cursor: "ew-resize",
    x: (rect) => {
      "worklet";
      return rect.x.value + rect.width.value;
    },
    y: (rect) => {
      "worklet";
      return rect.y.value + rect.height.value / 2;
    },
  },
];
