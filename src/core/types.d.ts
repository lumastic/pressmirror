import { EditorState } from "prosemirror-state";
import React from "react";
import { EditorViewProvider, PluginsProvider } from "./providers";
import { ExtensionProvider } from "./providers/ExtensionProvider";
import { PortalProvider } from "./providers/PortalProvider";

export type EditorContext = {
  // analyticsProvider: AnalyticsProvider
  // apiProvider: APIProvider
  // collabProvider: CollabProvider
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
  onEditorReady?: (ctx: EditorContext) => void;
  onDocumentEdit?: (newState: EditorState) => void;
}
