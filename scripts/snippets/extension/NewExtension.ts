import { EditorState, PluginKey } from "prosemirror-state";
import { Extension, ExtensionPlugin } from "../Extension";
import { NEW_EXTENSION_LOWERPluginFactory, NEW_EXTENSIONState } from "./NEW_EXTENSION_LOWERPluginFactory";
import { NEW_EXTENSION_LOWERPluginKey } from "./NEW_EXTENSION_LOWERPluginKey";


export class NEW_EXTENSIONExtension extends Extension<Record<string, unknown>> {
  get name(): string {
    return "NEW_EXTENSION_LOWER";
  }

  static get pluginKey(): PluginKey {
    return NEW_EXTENSION_LOWERPluginKey;
  }

  static getPluginState(state: EditorState): NEW_EXTENSIONState {
    return getPluginState(state);
  }

  subscribe(fn: (newState: NEW_EXTENSIONState) => void): void {
    this.ctx.pluginsProvider.subscribe(NEW_EXTENSION_LOWERPluginKey, fn);
  }

  unsubscribe(fn: (newState: NEW_EXTENSIONState) => void): void {
    this.ctx.pluginsProvider.unsubscribe(NEW_EXTENSION_LOWERPluginKey, fn);
  }

  get plugins(): ExtensionPlugin[] {
    return [
      { name: "NEW_EXTENSION_LOWER", plugin: () => NEW_EXTENSION_LOWERPluginFactory(this.ctx, this.props) }
    ];
  }
}
function getPluginState(state: EditorState): NEW_EXTENSIONState {
    return NEW_EXTENSION_LOWERPluginKey.getState(state);
  }
  