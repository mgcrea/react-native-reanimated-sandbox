import React, { FunctionComponent, useCallback, useState } from "react";
import {
  GestureResponderEvent,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { Rect, Size } from "src/types";

export type ViewMaskkProps = {
  style?: StyleProp<ViewStyle>;
  imageSize: Size;
  containerSize: Size;
};
export const ViewMask: FunctionComponent<ViewMaskkProps> = ({ style }) => {
  return (
    <View style={[StyleSheet.absoluteFill, style]}>
      <Text>ViewMask</Text>
      <ViewRect rect={{ x: 100, y: 100, width: 200, height: 100, rotation: 0.1 }} isActive />
    </View>
  );
};

type ViewRectProps = {
  rect: Rect;
  isActive?: boolean;
};
const ViewRect: FunctionComponent<ViewRectProps> = ({ rect, isActive }) => {
  const { x, y, width, height } = rect;
  const [activeHandleId, setActiveHandleId] = useState<string | null>(null);
  const handleBoxHandlePressIn = useCallback(
    (_event: GestureResponderEvent, id: string) => {
      console.log("handleBoxHandlePressIn", id);
      if (activeHandleId === id) {
        console.warn(`clicked on the same handle twice ${id}, unexpected?`);
      }
      setActiveHandleId(id);
    },
    [activeHandleId],
  );

  return (
    <View
      style={{ position: "relative", width, height, top: y, left: x, backgroundColor: "green" }}
    >
      <Text>Rect</Text>
      {isActive ? (
        <View style={{ position: "absolute", top: 0, left: 0 }}>
          {SVG_RESIZEABLE_RECT_HANDLES.map((handle) => (
            <ViewRectHandle
              id={handle.id}
              key={handle.id}
              rect={rect}
              onPressIn={handleBoxHandlePressIn}
              isActive={activeHandleId === handle.id}
            />
          ))}
        </View>
      ) : null}
    </View>
  );
};

type ViewRectHandleProps = {
  id: string;
  rect: Rect;
  isActive?: boolean;
  onPressIn?: (ev: GestureResponderEvent, id: string) => void;
};

export const ViewRectHandle: FunctionComponent<ViewRectHandleProps> = ({
  id,
  rect,
  isActive,
  onPressIn,
}) => {
  const handle = SVG_RESIZEABLE_RECT_HANDLES.find((point) => point.id === id);
  if (!handle) {
    throw new Error(`handle not found for id: ${id}`);
  }
  const x = handle.x(rect);
  const y = handle.y(rect);

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

  const size = 32;

  return (
    <Pressable onPressIn={handlePressIn}>
      <View
        style={{
          position: "absolute",
          borderRadius: size / 2,
          width: size,
          height: size,
          backgroundColor: isActive ? "rgba(0, 0, 255, .8)" : "rgba(255, 255, 255, .8)",
          top: y - size / 2,
          left: x - size / 2,
        }}
      />
    </Pressable>
  );
};

type RectHandle = {
  id: string;
  cursor: string;
  x: (rect: Rect) => number;
  y: (rect: Rect) => number;
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
      return rect.width;
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
      return rect.height;
    },
  },
  {
    id: "bottom-right",
    cursor: "nwse-resize",
    x: (rect) => {
      "worklet";
      return rect.width;
    },
    y: (rect) => {
      "worklet";
      return rect.height;
    },
  },
  {
    id: "top-center",
    cursor: "ns-resize",
    x: (rect) => {
      "worklet";
      return rect.width / 2;
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
      return rect.width / 2;
    },
    y: (rect) => {
      "worklet";
      return rect.height;
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
      return rect.height / 2;
    },
  },
  {
    id: "right-center",
    cursor: "ew-resize",
    x: (rect) => {
      "worklet";
      return rect.width;
    },
    y: (rect) => {
      "worklet";
      return rect.height / 2;
    },
  },
];
