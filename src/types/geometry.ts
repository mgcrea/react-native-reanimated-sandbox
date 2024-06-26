import { Tuple } from "./tuple";

export type Point<T = number> = {
  x: T;
  y: T;
};

export type FlatPoint<T = number> = [T, T];

export type Circle<T = number> = {
  x: T;
  y: T;
  r: T;
};

export type FlatCircle<T = number> = [T, T, T];

export type Box<T = number> = Tuple<Tuple<T, 2>, 4>;

export type Size<T = number> = {
  width: T;
  height: T;
};

export type Rect<T = number> = {
  x: T;
  y: T;
  width: T;
  height: T;
  rotation: T;
};
