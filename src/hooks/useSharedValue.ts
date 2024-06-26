import {useSharedValue, type SharedValue} from 'react-native-reanimated';
import type {Point, Rect, Size} from 'src/types';

export type SharedPoint = Point<SharedValue<number>>;

export const useSharedPoint = (x: number, y: number): SharedPoint => {
  return {
    x: useSharedValue(x),
    y: useSharedValue(y),
  };
};

export type SharedSize = Size<SharedValue<number>>;

export const useSharedSize = (width: number, height: number): SharedSize => {
  return {
    width: useSharedValue(width),
    height: useSharedValue(height),
  };
};

export type SharedRect = Rect<SharedValue<number>>;

export const useSharedRect = (
  x: number,
  y: number,
  width: number,
  height: number,
  rotation = 0,
): SharedRect => {
  return {
    x: useSharedValue(x),
    y: useSharedValue(y),
    width: useSharedValue(width),
    height: useSharedValue(height),
    rotation: useSharedValue(rotation),
  };
};
