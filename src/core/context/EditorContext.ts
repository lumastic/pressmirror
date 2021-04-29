import { createContext } from "react";
import {
  EditorViewProvider,
  PluginsProvider,
  PortalProvider
} from "../providers";

// import { AnalyticsProvider } from "./AnalyticsProvider";

export const EditorContext = createContext<{
  portalProvider: PortalProvider;
  viewProvider: EditorViewProvider;
  pluginsProvider: PluginsProvider;
  // analyticsProvider: AnalyticsProvider;
}>({
  portalProvider: new PortalProvider(),
  viewProvider: new EditorViewProvider(),
  pluginsProvider: new PluginsProvider()
  // analyticsProvider: new AnalyticsProvider()
});
