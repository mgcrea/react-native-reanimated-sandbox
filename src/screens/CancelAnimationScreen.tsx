import { FunctionComponent, useLayoutEffect } from "react";
import { Button, SafeAreaView, StyleSheet, useWindowDimensions, View } from "react-native";
import Animated, {
  cancelAnimation,
  runOnUI,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  type WithSpringConfig,
} from "react-native-reanimated";

export const CancelAnimationScreen: FunctionComponent = () => {
  const { height, width } = useWindowDimensions();
  const x = useSharedValue(0);
  const active = useSharedValue(false);
  const offsetMap = useSharedValue<Record<string, SharedValue<number>>>({});
  const offsetArray = useSharedValue<SharedValue<number>[]>([]);

  useLayoutEffect(() => {
    runOnUI(layout)();
  }, []);

  const layout = () => {
    "worklet";
    offsetMap.value.x = x;
    offsetArray.value[0] = x;
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: x.value }],
    };
  });

  const handlePress = () => {
    console.log("start");
    runOnUI(start)();
  };
  const start = () => {
    "worklet";
    offsetArray.value[0].value = withSpring(!active.value ? width / 2 : 0, SLOW_SPRING_CONFIG);
    active.value = !active.value;
  };

  const handleCancel = () => {
    console.log("cancel");
    runOnUI(cancel)();
  };
  const cancel = () => {
    "worklet";
    cancelAnimation(offsetMap.value["x"]);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Button title="start" onPress={handlePress} />
      <Button title="cancel" onPress={handleCancel} />
      <View style={styles.container}>
        <Animated.View style={[styles.box, animatedStyle]} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "lightblue",
    flex: 1,
  },
  box: {
    width: 64,
    height: 64,
    backgroundColor: "red",
    margin: 12,
  },
});

const SLOW_SPRING_CONFIG: WithSpringConfig = {
  damping: 20, // Defines how the spring’s motion should be damped due to the forces of friction. Default 10.
  mass: 1, // The mass of the object attached to the end of the spring. Default 1.
  stiffness: 5, // The spring stiffness coefficient. Default 100.
  overshootClamping: true, // Indicates whether the spring should be clamped and not bounce. Default false.
  restSpeedThreshold: 0.01, // The speed at which the spring should be considered at rest in pixels per second. Default 0.001.
  restDisplacementThreshold: 0.2, // The threshold of displacement from rest below which the spring should be considered at rest. Default 0.001.
};
