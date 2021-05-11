import { EditorState, PluginKey } from "prosemirror-state";
import { Extension, ExtensionPlugin, IExtensionSchema } from "../Extension";
import { embedPluginFactory, EmbedPluginState } from "./embedPluginFactory";
import { embedPluginKey } from "./embedPluginKey";
import { link_node, youtube_embed } from "./nodes";

export class EmbedExtension extends Extension<Record<string, unknown>> {
  get name(): string {
    return "embeds";
  }

  static get pluginKey(): PluginKey {
    return embedPluginKey;
  }

  get schema(): IExtensionSchema {
    return { nodes: { link_node, youtube_embed } };
  }

  static getPluginState(state: EditorState): EmbedPluginState {
    return getPluginState(state);
  }

  subscribe(fn: (newState: EmbedPluginState) => void): void {
    this.ctx.pluginsProvider.subscribe(embedPluginKey, fn);
  }

  unsubscribe(fn: (newState: EmbedPluginState) => void): void {
    this.ctx.pluginsProvider.unsubscribe(embedPluginKey, fn);
  }

  get plugins(): ExtensionPlugin[] {
    return [
      {
        name: "embeds",
        plugin: () => embedPluginFactory(this.ctx, this.props)
      }
    ];
  }
}

function getPluginState(state: EditorState): EmbedPluginState {
  return embedPluginKey.getState(state);
}
