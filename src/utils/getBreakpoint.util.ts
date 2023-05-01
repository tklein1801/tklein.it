export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export function getBreakpoint(width: number): Breakpoint {
  if (width >= 1536) {
    return 'xl';
  } else if (width >= 1200) {
    return 'lg';
  } else if (width >= 900) {
    return 'md';
  } else if (width >= 600) {
    return 'sm';
  } else {
    return 'xs';
  }
}
