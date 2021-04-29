import { EditorState, PluginKey } from "prosemirror-state";
import { Extension, ExtensionPlugin } from "../Extension";
import { focusPluginFactory } from "../plugins/focus";
import { FocusPluginState } from "./focusPluginFactory";
import { focusPluginKey } from "./focusPluginKey";

export class FocusExtention extends Extension<Record<string, unknown>> {
  get name(): string {
    return "focus";
  }

  static get pluginKey(): PluginKey {
    return focusPluginKey;
  }

  static getPluginState(state: EditorState): FocusPluginState {
    return getPluginState(state);
  }

  subscribe(fn: (newState: FocusPluginState) => void): void {
    this.ctx.pluginsProvider.subscribe(focusPluginKey, fn);
  }

  unsubscribe(fn: (newState: FocusPluginState) => void): void {
    this.ctx.pluginsProvider.unsubscribe(focusPluginKey, fn);
  }

  get plugins(): ExtensionPlugin[] {
    return [{ name: "base", plugin: () => focusPluginFactory }];
  }
}

function getPluginState(state: EditorState): FocusPluginState {
  return focusPluginFactory.getState(state);
}
