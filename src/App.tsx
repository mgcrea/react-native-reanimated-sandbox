/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import type { PropsWithChildren } from "react";
import React from "react";
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  useWindowDimensions,
  View,
} from "react-native";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { SvgMask, ViewMask } from "./components";
import { ZoomView } from "./components/ZoomView";
import { Size } from "./types";

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({ children, title }: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === "dark";
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}
      >
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}
      >
        {children}
      </Text>
    </View>
  );
}

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

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ZoomView style={{ padding, flex: 1, backgroundColor: "darkseagreen" }}>
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
            style={{ right: "50%" }}
          />
        ) : null}
        {containerSize ? (
          <ViewMask
            imageSize={{ width, height }}
            containerSize={containerSize}
            style={{ left: "50%" }}
          />
        ) : null}
      </ZoomView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
  },
  highlight: {
    fontWeight: "700",
  },
});

export default App;
