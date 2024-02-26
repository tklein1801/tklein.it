'use client'; // Error components must be Client Components

import React from 'react';

export default function Error({error, reset}: {error: Error & {digest?: string}; reset: () => void}) {
  return (
    <React.Fragment>
      {JSON.stringify(
        {
          name: error.name,
          message: error.message,
          digest: error.digest,
        },
        null,
        2,
      )}
    </React.Fragment>
  );
}
