import React, { FunctionComponent, PropsWithChildren } from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import {
  Gesture,
  GestureDetector,
  PanGesture,
  PinchGesture,
  PointerType,
  RotationGesture,
} from "react-native-gesture-handler";
import Animated, { runOnUI, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { useSharedPoint, useSharedSize } from "src/hooks";

export type ZoomViewProps = {
  style?: StyleProp<ViewStyle>;
  panGesture?: PanGesture;
  pinchGesture?: PinchGesture;
  rotationGesture?: RotationGesture;
};

export const ZoomView: FunctionComponent<PropsWithChildren<ZoomViewProps>> = ({
  children,
  panGesture = Gesture.Pan(),
  pinchGesture = Gesture.Pinch(),
  rotationGesture = Gesture.Rotation(),
  style,
}) => {
  const scale = useSharedValue(1);
  const lastScale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const lastRotation = useSharedValue(0);
  const offset = useSharedSize(0, 0);
  const lastOffset = useSharedSize(0, 0);

  const origin = useSharedPoint(0, 0);
  const size = useSharedSize(0, 0);
  const focal = useSharedPoint(0, 0);

  pinchGesture
    .onUpdate((event) => {
      "worklet";
      // Ignore pinch gestures with less than 2 pointers
      if (event.numberOfPointers !== 2) {
        return;
      }
      const delta = event.scale / lastScale.value;
      lastScale.value = event.scale;
      scale.value *= delta;
      // Track the scale and focal point
      focal.x.value = event.focalX;
      focal.y.value = event.focalY;
      origin.x.value = event.focalX - size.width.value / 2;
      origin.y.value = event.focalY - size.height.value / 2;
    })
    .onEnd((_event) => {
      "worklet";
      lastScale.value = 1.0;
    });

  panGesture
    .averageTouches(true)
    .onUpdate((event) => {
      "worklet";
      if (event.pointerType === PointerType.STYLUS) {
        return;
      }
      offset.width.value = lastOffset.width.value + event.translationX;
      offset.height.value = lastOffset.height.value + event.translationY;
    })
    .onEnd((_event) => {
      "worklet";
      lastOffset.width.value = offset.width.value;
      lastOffset.height.value = offset.height.value;
    });

  rotationGesture
    .onUpdate((event) => {
      "worklet";
      // Ignore rotation gestures with less than 2 pointers
      if (event.numberOfPointers !== 2) {
        return;
      }
      const delta = event.rotation - lastRotation.value;
      lastRotation.value = event.rotation;
      rotation.value += delta;
    })
    .onEnd((_event) => {
      "worklet";
      lastRotation.value = 0;
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: offset.width.value },
        { translateY: offset.height.value },
        { rotate: `${rotation.value}rad` },
        { scale: scale.value },
      ],
    };
  });

  const focalPointStyle = useAnimatedStyle(() => {
    const focalX = focal.x.value;
    const focalY = focal.y.value;
    return {
      opacity: rotation.value === 0 && scale.value === 1 ? 0 : 1,
      transform: [{ translateX: focalX - 10 }, { translateY: focalY - 10 }],
    };
  });

  const composedGesture = Gesture.Simultaneous(pinchGesture, panGesture, rotationGesture);

  return (
    <GestureDetector gesture={composedGesture}>
      <Animated.View
        style={[styles.container, style]}
        onLayout={(event) => {
          const { width, height } = event.nativeEvent.layout;
          console.log("ZoomView.layout", { width, height });
          runOnUI(() => {
            size.width.value = width;
            size.height.value = height;
          })();
        }}
      >
        <Animated.View style={animatedStyle}>{children}</Animated.View>
        <Animated.View style={[styles.focalPoint, focalPointStyle]} />
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {},
  button: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "lightblue",
    padding: 12,
    margin: 24,
  },
  focalPoint: {
    ...StyleSheet.absoluteFillObject,
    width: 16,
    height: 16,
    backgroundColor: "rgba(255, 128, 128, .8)",
    borderRadius: 8,
  },
});
