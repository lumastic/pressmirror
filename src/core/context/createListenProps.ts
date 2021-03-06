import { useEffect } from "react";
import { PortalProvider } from "../providers";

export function createListenProps<A>(
  container: HTMLElement,
  portalProvider: PortalProvider
) {
  return function (cb: (newProps: A) => void): void {
    useEffect(() => {
      portalProvider.subscribe(container, cb);
      return () => {
        portalProvider.unsubscribe(container, cb);
      };
    }, []);
  };
}
