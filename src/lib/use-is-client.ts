import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

// Returns false during SSR and the first client render, true after —
// avoids the setState-in-effect hydration-guard pattern.
export function useIsClient() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
