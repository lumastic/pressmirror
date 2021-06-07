import { EditorState } from "prosemirror-state";
import React from "react";
import { EditorViewProvider, PluginsProvider } from "./providers";
import { CallbacksProvider } from "./providers/CallbacksProvider";
import { ExtensionProvider } from "./providers/ExtensionProvider";
import { PortalProvider } from "./providers/PortalProvider";

export type ProviderContextType = {
  // analyticsProvider: AnalyticsProvider
  // apiProvider: APIProvider
  callbacksProvider: CallbacksProvider;
  extensionProvider: ExtensionProvider;
  pluginsProvider: PluginsProvider;
  portalProvider: PortalProvider;
  viewProvider: EditorViewProvider;
};

export type EditorContextType = {
  updateHandlers: (ctx: ProviderContextType) => void;
  registerHandler: (type: string, handler: (_any: any) => void) => void;
};

export type EditorAppearance = "full-page";

export interface EditorProps {
  children: React.ReactNode;
  disabled?: boolean;
  appearance?: EditorAppearance;
  onEditorReady?: (ctx: ProviderContextType, defaultState: EditorState) => void;
  onDocumentEdit?: (newState: EditorState) => void;
  initialDoc?: Record<string, unknown>;
  className?: string;
  placeholder?: string;
  readOnly?: boolean;
}
