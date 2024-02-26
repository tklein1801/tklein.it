import React, {Suspense} from 'react';

export function withSuspense<P extends object>(
  Component: React.ComponentType<P>,
  LoadingComponent: React.ComponentType,
) {
  return (props: P) => (
    <Suspense fallback={<LoadingComponent />}>
      <Component {...props} />
    </Suspense>
  );
}
