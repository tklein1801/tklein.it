import { getBreakpoint } from './getBreakpoint.util';

export function getWindowDimensions(window: Window) {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
    breakpoint: getBreakpoint(width),
  };
}
