import React from "react";
import { Image, StatusBar, useColorScheme, useWindowDimensions } from "react-native";
import { Gesture, GestureHandlerRootView } from "react-native-gesture-handler";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { SvgMask } from "./components";
import { ZoomView } from "./components/ZoomView";
import { Size } from "./types";

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === "dark";

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [containerSize, setContainerSize] = React.useState<Size | null>(null);
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const padding = 48;
  const width = screenWidth - padding * 2;
  const height = screenHeight - padding * 2;

  const rootPanGesture = Gesture.Pan();
  const rootPinchGesture = Gesture.Pinch();
  const rootRotationGesture = Gesture.Rotation();

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ZoomView
        style={{ padding, flex: 1, backgroundColor: "darkseagreen" }}
        panGesture={rootPanGesture}
        pinchGesture={rootPinchGesture}
        rotationGesture={rootRotationGesture}
      >
        <Image
          resizeMode="contain"
          onLayout={(event) => {
            const { width, height } = event.nativeEvent.layout;
            setContainerSize({ width, height });
          }}
          source={{
            uri: `https://picsum.photos/seed/picsum/${width}/${height}`,
            width: width,
            height: height,
          }}
        />
        {containerSize ? (
          <SvgMask
            imageSize={{ width, height }}
            containerSize={containerSize}
            simultaneousGestures={[rootPanGesture, rootPinchGesture, rootRotationGesture]}
          />
        ) : null}
      </ZoomView>
    </GestureHandlerRootView>
  );
}

export default App;
