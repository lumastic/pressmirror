import { baseKeymap } from "prosemirror-commands";
import { history, redo, undo } from "prosemirror-history";
import { keymap } from "prosemirror-keymap";
import { EditorState, PluginKey } from "prosemirror-state";
import toggleHeadingCommand from "../../commands/toggleHeadingCommand";
import { toggleLink } from "../../commands/toggleLink";
import toggleMarkCommand from "../../commands/toggleMarkCommand";
import { Extension, ExtensionPlugin, IExtensionSchema } from "../Extension";
import { basePluginFactory } from "./basePluginFactory";
import { italic, strong, link, underline } from "./marks";
import { doc, heading, paragraph, text, count } from "./nodes";
import { basePluginKey, BaseState, getPluginState } from "./state";

const toggleBold = toggleMarkCommand("strong");
const toggleItalic = toggleMarkCommand("italic");
const toggleUnderline = toggleMarkCommand("underline");

export const baseSchema: IExtensionSchema = {
  nodes: { doc, paragraph, text, heading, count },
  marks: { italic, strong, link, underline }
};
export class BaseExtension extends Extension<Record<string, unknown>> {
  get name(): string {
    return "base";
  }

  get schema(): IExtensionSchema {
    return baseSchema;
  }

  static get pluginKey(): PluginKey {
    return basePluginKey;
  }

  static getPluginState(state: EditorState): BaseState {
    return getPluginState(state);
  }

  subscribe(fn: (newState: BaseState) => void): void {
    this.ctx.pluginsProvider.subscribe(basePluginKey, fn);
  }

  unsubscribe(fn: (newState: BaseState) => void): void {
    this.ctx.pluginsProvider.unsubscribe(basePluginKey, fn);
  }

  get plugins(): ExtensionPlugin[] {
    return [
      { name: "history", plugin: () => history() },
      {
        name: "baseKeyMap",
        plugin: () =>
          keymap({
            ...baseKeymap,
            "Mod-z": undo,
            "Mod-y": redo,
            "Mod-Shift-z": redo,
            "Mod-b": toggleBold,
            "Mod-i": toggleItalic,
            "Mod-u": toggleUnderline,
            "Mod-Shift-1": toggleHeadingCommand(1),
            "Mod-Shift-2": toggleHeadingCommand(2),
            "Mod-k": toggleLink
          })
      },
      { name: "base", plugin: () => basePluginFactory(this.ctx, this.props) }
    ];
  }
}
