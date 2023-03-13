import { forwardRef, FunctionComponent, PropsWithChildren, useImperativeHandle, useRef } from "react";
import { SafeAreaView } from "react-native";
import { useAnimatedReaction } from "react-native-reanimated";

export const ReadOnlyRefScreen: FunctionComponent = () => {
  const ref = useRef<Handle>(null);

  useAnimatedReaction(
    () => ref.current,
    (next, prev) => {
      // console.log([prev, next]);
    }
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ComponentWithRef ref={ref} />
    </SafeAreaView>
  );
};

type Handle = {
  foo: string;
};

const ComponentWithRef = forwardRef<Handle, PropsWithChildren>(function ComponentWithRef({ children }, ref) {
  useImperativeHandle(
    ref,
    () => {
      return {
        foo: "bar",
      };
    },
    []
  );
  return <>{children}</>;
});
