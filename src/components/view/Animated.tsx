import { Pressable, View } from "react-native";
import Animated from "react-native-reanimated";

export const AnimatedView = Animated.createAnimatedComponent(View);
export const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
