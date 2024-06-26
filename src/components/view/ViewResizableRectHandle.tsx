import React, { FunctionComponent, useCallback } from "react";
import { GestureResponderEvent } from "react-native";
import { useAnimatedStyle, useDerivedValue } from "react-native-reanimated";
import { SharedRect } from "src/hooks";
import { AnimatedPressable, AnimatedView } from "./Animated";

type ViewResizableRectHandleProps = {
  id: string;
  rect: SharedRect;
  isActive?: boolean;
  onPressIn?: (ev: GestureResponderEvent, id: string) => void;
};

export const ViewResizableRectHandle: FunctionComponent<ViewResizableRectHandleProps> = ({
  id,
  rect,
  isActive,
  onPressIn,
}) => {
  const size = 32;
  const handle = SVG_RESIZEABLE_RECT_HANDLES.find((point) => point.id === id);
  if (!handle) {
    throw new Error(`handle not found for id: ${id}`);
  }
  const x = useDerivedValue(() => handle?.x(rect) ?? 0);
  const y = useDerivedValue(() => handle?.y(rect) ?? 0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      top: y.value - size / 2,
      left: x.value - size / 2,
      width: size,
      height: size,
    };
  }, [size]);

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
    <AnimatedPressable onPressIn={handlePressIn}>
      <AnimatedView
        style={[
          {
            position: "absolute",
            borderRadius: size / 2,
            backgroundColor: isActive ? "rgba(0, 0, 255, .8)" : "rgba(255, 255, 255, .8)",
          },
          animatedStyle,
        ]}
      />
    </AnimatedPressable>
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
      return 0;
    },
    y: (rect) => {
      "worklet";
      return 0;
    },
  },
  {
    id: "top-right",
    cursor: "nesw-resize",
    x: (rect) => {
      "worklet";
      return rect.width.value;
    },
    y: (rect) => {
      "worklet";
      return 0;
    },
  },
  {
    id: "bottom-left",
    cursor: "nesw-resize",
    x: (rect) => {
      "worklet";
      return 0;
    },
    y: (rect) => {
      "worklet";
      return rect.height.value;
    },
  },
  {
    id: "bottom-right",
    cursor: "nwse-resize",
    x: (rect) => {
      "worklet";
      return rect.width.value;
    },
    y: (rect) => {
      "worklet";
      return rect.height.value;
    },
  },
  {
    id: "top-center",
    cursor: "ns-resize",
    x: (rect) => {
      "worklet";
      return rect.width.value / 2;
    },
    y: (rect) => {
      "worklet";
      return 0;
    },
  },
  {
    id: "bottom-center",
    cursor: "ns-resize",
    x: (rect) => {
      "worklet";
      return rect.width.value / 2;
    },
    y: (rect) => {
      "worklet";
      return rect.height.value;
    },
  },
  {
    id: "left-center",
    cursor: "ew-resize",
    x: (rect) => {
      "worklet";
      return 0;
    },
    y: (rect) => {
      "worklet";
      return rect.height.value / 2;
    },
  },
  {
    id: "right-center",
    cursor: "ew-resize",
    x: (rect) => {
      "worklet";
      return rect.width.value;
    },
    y: (rect) => {
      "worklet";
      return rect.height.value / 2;
    },
  },
];
