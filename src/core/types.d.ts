import { EditorState } from "prosemirror-state";
import React from "react";
import { EditorViewProvider, PluginsProvider } from "./providers";
import { CallbacksProvider } from "./providers/CallbacksProvider";
import { ExtensionProvider } from "./providers/ExtensionProvider";
import { PortalProvider } from "./providers/PortalProvider";

export type EditorContext = {
  // analyticsProvider: AnalyticsProvider
  // apiProvider: APIProvider
  callbacksProvider: CallbacksProvider;
  extensionProvider: ExtensionProvider;
  pluginsProvider: PluginsProvider;
  portalProvider: PortalProvider;
  viewProvider: EditorViewProvider;
};

export type EditorAppearance = "full-page";

export interface EditorProps {
  children: React.ReactNode;
  disabled?: boolean;
  appearance?: EditorAppearance;
  onEditorReady?: (ctx: EditorContext, defaultState: EditorState) => void;
  onDocumentEdit?: (newState: EditorState) => void;
  initialDoc?: Record<string, unknown>;
  className?: string;
  placeholder?: string;
  readOnly?: boolean;
}
