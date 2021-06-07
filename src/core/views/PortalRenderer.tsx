import React, { useEffect, useReducer, useState } from "react";
import { useProviderContext } from "../context/useEditorContext";

/**
 * Component to render the mounted nodeViews as portals.
 */
export function PortalRenderer(): React.ReactElement {
  const { portalProvider } = useProviderContext();
  const [_ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const [portals, setPortals] = useState<Map<HTMLElement, React.ReactPortal>>(
    new Map()
  );

  useEffect(() => {
    portalProvider.addPortalRendererCallback(onUpdatePortals);
  }, []);

  const onUpdatePortals = (newPortals: Map<HTMLElement, React.ReactPortal>) => {
    setPortals(newPortals);
    forceUpdate();
  };

  return (
    <>{Array.from(portals.entries()).map(([container, portal]) => portal)}</>
  );
}
