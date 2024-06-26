import React, { FunctionComponent, useCallback, useState } from "react";
import { GestureResponderEvent, Text, View } from "react-native";
import { useSharedRect } from "src/hooks";
import { Rect } from "src/types";
import { SVG_RESIZEABLE_RECT_HANDLES, ViewResizableRectHandle } from "./ViewResizableRectHandle";

export type ViewResizableRectProps = {
  id?: string;
  rect: Rect;
  isActive?: boolean;
};
export const ViewResizableRect: FunctionComponent<ViewResizableRectProps> = ({
  id,
  rect: rectProp,
  isActive,
}) => {
  const { x, y, width, height, rotation } = rectProp;
  const rect = useSharedRect(x, y, width, height, rotation);

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
            <ViewResizableRectHandle
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
