import React, { FunctionComponent } from "react";
import { StyleSheet } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureEventPayload,
  PointerType,
  State,
} from "react-native-gesture-handler";
import type { GestureRef } from "react-native-gesture-handler/lib/typescript/handlers/gestures/gesture";
import { useSharedValue } from "react-native-reanimated";
import Svg, { Circle, G } from "react-native-svg";
import { useSharedPoint } from "src/hooks";
import { Size } from "src/types";

const DEFAULT_POINTER_TYPES = [PointerType.STYLUS, PointerType.MOUSE];

export type SvgMaskProps = {
  simultaneousGestures: Exclude<GestureRef, number>[];
  imageSize: Size;
  containerSize: Size;
};

export const SvgMask: FunctionComponent<SvgMaskProps> = ({ simultaneousGestures }) => {
  const panState = useSharedValue<GestureEventPayload["state"]>(State.UNDETERMINED);
  const panPoint = useSharedPoint(0, 0);
  const panBeginPoint = useSharedPoint(0, 0);

  const pointerTypes = DEFAULT_POINTER_TYPES;

  const panGesture = Gesture.Pan()
    .minDistance(1)
    .simultaneousWithExternalGesture(...simultaneousGestures)
    .onBegin((event) => {
      "worklet";
      if (!pointerTypes.includes(event.pointerType)) {
        return;
      }
      panBeginPoint.x.value = event.x;
      panBeginPoint.y.value = event.y;
      panState.value = event.state;
    })
    .onStart((event) => {
      "worklet";
      if (!pointerTypes.includes(event.pointerType)) {
        return;
      }
      panState.value = event.state;
      panPoint.x.value = event.x;
      panPoint.y.value = event.y;
    })
    .onUpdate((event) => {
      "worklet";
      if (!pointerTypes.includes(event.pointerType)) {
        return;
      }
      panState.value = event.state;
      panPoint.x.value = event.x;
      panPoint.y.value = event.y;
    })
    .onEnd((event) => {
      "worklet";
      if (!pointerTypes.includes(event.pointerType)) {
        return;
      }
      panState.value = event.state;
      // panPoint.x.value = 0;
      // panPoint.y.value = 0;
    })
    .onFinalize((event) => {
      "worklet";
      panState.value = event.state;
    });

  const composedGesture = Gesture.Simultaneous(panGesture);

  return (
    <GestureDetector gesture={composedGesture}>
      <Svg height="100%" width="100%" style={StyleSheet.absoluteFill}>
        <G>
          <Circle cx={100} cy={100} r={10} fill="red" />
        </G>
      </Svg>
    </GestureDetector>
  );
};
