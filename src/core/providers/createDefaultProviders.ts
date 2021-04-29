import { ExtensionProvider } from "./ExtensionProvider";
import { EditorViewProvider } from "./EditorViewProvider";
import { PluginsProvider } from "./PluginsProvider";
import { EditorContext } from "../types";
import { PortalProvider } from "./PortalProvider";

export const createDefaultProviders = (): EditorContext => {
  // const analyticsProvider = new AnalyticsProvider();
  // const apiProvider = new APIProvider();
  const extensionProvider = new ExtensionProvider();
  const pluginsProvider = new PluginsProvider();
  const portalProvider = new PortalProvider();
  const viewProvider = new EditorViewProvider();
  // const collabProvider = new CollabProvider(apiProvider, viewProvider);
  return {
    // analyticsProvider,
    // apiProvider,
    extensionProvider,
    pluginsProvider,
    portalProvider,
    viewProvider
    // collabProvider
  };
};