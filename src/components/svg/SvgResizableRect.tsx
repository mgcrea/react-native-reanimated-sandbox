import React, { FunctionComponent, useCallback, useRef, useState } from "react";
import { GestureResponderEvent, StyleSheet } from "react-native";
import { useAnimatedProps } from "react-native-reanimated";
import { GProps } from "react-native-svg";
import { AnimatedG, AnimatedRect } from "src/components/svg";
import { SharedRect, useSharedRect } from "src/hooks";
import { Point, Rect } from "src/types";
import { SVG_RESIZEABLE_RECT_HANDLES, SvgResizableRectHandle } from "./SvgResizableRectHandle";

export type SvgResizableRectProps = Pick<GProps, "onPress" | "onPressIn"> & {
  id?: string;
  rect: Rect;
  scale?: number;
  isActive: boolean;
};

export const SvgResizableRect: FunctionComponent<SvgResizableRectProps> = ({
  id,
  rect: rectProp,
  scale = 1,
  isActive,
  ...otherProps
}) => {
  const { x, y, width, height, rotation } = rectProp;
  const rect = useSharedRect(x, y, width, height, rotation);

  const [activeHandleId, setActiveHandleId] = useState<string | null>(null);
  const activeHandleIndex = SVG_RESIZEABLE_RECT_HANDLES.findIndex(
    (point) => point.id === activeHandleId,
  );

  const lastId = useRef<string | null>(null);
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

  const groupAnimatedProps = useAnimatedProps(() => {
    const center = getSharedRectCenter(rect);
    return {
      rotation: rect.rotation.value,
      originX: center.x,
      originY: center.y,
    };
  }, []);
  const rectAnimatedProps = useAnimatedProps(() => {
    return {
      x: rect.x.value,
      y: rect.y.value,
      width: rect.width.value,
      height: rect.height.value,
    };
  }, []);

  return (
    <>
      <AnimatedG animatedProps={groupAnimatedProps}>
        <AnimatedRect
          animatedProps={rectAnimatedProps}
          fill={isActive ? "red" : "gray"}
          stroke={"red"}
          strokeWidth={StyleSheet.hairlineWidth}
          {...otherProps}
        />
        {isActive ? (
          <>
            {SVG_RESIZEABLE_RECT_HANDLES.map((handle) => (
              <SvgResizableRectHandle
                id={handle.id}
                key={handle.id}
                rect={rect}
                onPressIn={handleBoxHandlePressIn}
                isActive={activeHandleId === handle.id}
              />
            ))}
          </>
        ) : null}
      </AnimatedG>
    </>
  );
};

const getSharedRectCenter = (rect: SharedRect): Point => {
  "worklet";
  return {
    x: rect.x.value + rect.width.value / 2,
    y: rect.y.value + rect.height.value / 2,
  };
};
