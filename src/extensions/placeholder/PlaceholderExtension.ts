import { EditorState, PluginKey } from "prosemirror-state";
import { Extension, ExtensionPlugin } from "../Extension";
import {
  placeholderPluginFactory,
  PlaceholderPluginProps
} from "./placeholderPluginFactory";
import { placeholderPluginKey } from "./placeholderPluginKey";

export class PlaceholderExtension extends Extension<Record<string, unknown>> {
  get name(): string {
    return "placeholder";
  }

  static get pluginKey(): PluginKey {
    return placeholderPluginKey;
  }

  static getPluginState(state: EditorState): PlaceholderPluginProps {
    return getPluginState(state);
  }

  subscribe(fn: (newState: PlaceholderPluginProps) => void): void {
    this.ctx.pluginsProvider.subscribe(placeholderPluginKey, fn);
  }

  unsubscribe(fn: (newState: PlaceholderPluginProps) => void): void {
    this.ctx.pluginsProvider.unsubscribe(placeholderPluginKey, fn);
  }

  get plugins(): ExtensionPlugin[] {
    return [
      {
        name: "placeholder",
        plugin: () => placeholderPluginFactory(this.props)
      }
    ];
  }
}

function getPluginState(state: EditorState): PlaceholderPluginProps {
  return placeholderPluginFactory({}).getState(state);
}
