import { EditorState, PluginKey } from "prosemirror-state";
import { Extension, ExtensionPlugin } from "../Extension";
import {
  suggestionPluginFactory,
  SuggestionState
} from "./suggestionPluginFactory";
import { suggestionPluginKey } from "./suggestionPluginKey";

export class SuggestionExtension extends Extension<Record<string, unknown>> {
  get name(): string {
    return "suggestion";
  }

  static get pluginKey(): PluginKey {
    return suggestionPluginKey;
  }

  static getPluginState(state: EditorState): SuggestionState {
    return getPluginState(state);
  }

  subscribe(fn: (newState: SuggestionState) => void): void {
    this.ctx.pluginsProvider.subscribe(suggestionPluginKey, fn);
  }

  unsubscribe(fn: (newState: SuggestionState) => void): void {
    this.ctx.pluginsProvider.unsubscribe(suggestionPluginKey, fn);
  }

  get plugins(): ExtensionPlugin[] {
    return [
      {
        name: "suggestion",
        plugin: () => suggestionPluginFactory(this.ctx, this.props)
      }
    ];
  }
}
function getPluginState(state: EditorState): SuggestionState {
  return suggestionPluginKey.getState(state);
}
