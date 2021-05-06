import { ExtensionProvider } from "./ExtensionProvider";
import { EditorViewProvider } from "./EditorViewProvider";
import { PluginsProvider } from "./PluginsProvider";
import { EditorContext } from "../types";
import { PortalProvider } from "./PortalProvider";
import {
  Callbacks,
  CallbacksProvider,
  mockCallbacks
} from "./CallbacksProvider";

export const createDefaultProviders = (
  callbacks?: Callbacks
): EditorContext => {
  // const analyticsProvider = new AnalyticsProvider();
  // const apiProvider = new APIProvider();
  const extensionProvider = new ExtensionProvider();
  const pluginsProvider = new PluginsProvider();
  const portalProvider = new PortalProvider();
  const viewProvider = new EditorViewProvider();
  const callbacksProvider = new CallbacksProvider(callbacks || mockCallbacks);
  return {
    // analyticsProvider,
    // apiProvider,
    extensionProvider,
    pluginsProvider,
    portalProvider,
    viewProvider,
    callbacksProvider
  };
};
