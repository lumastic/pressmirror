import { EditorState, PluginKey } from "prosemirror-state";
import { Extension, ExtensionPlugin, IExtensionSchema } from "../Extension";
import { linkPluginFactory, LinkPluginState } from "./linkPluginFactory";
import { linkPluginKey } from "./linkPluginKey";
import link_node from "./node/link_node";

export class LinkExtension extends Extension<Record<string, unknown>> {
  get name(): string {
    return "link_node";
  }

  static get pluginKey(): PluginKey {
    return linkPluginKey;
  }

  get schema(): IExtensionSchema {
    return { nodes: { link_node } };
  }

  static getPluginState(state: EditorState): LinkPluginState {
    return getPluginState(state);
  }

  subscribe(fn: (newState: LinkPluginState) => void): void {
    this.ctx.pluginsProvider.subscribe(linkPluginKey, fn);
  }

  unsubscribe(fn: (newState: LinkPluginState) => void): void {
    this.ctx.pluginsProvider.unsubscribe(linkPluginKey, fn);
  }

  get plugins(): ExtensionPlugin[] {
    return [
      {
        name: "link_node",
        plugin: () => linkPluginFactory(this.ctx, this.props)
      }
    ];
  }
}

function getPluginState(state: EditorState): LinkPluginState {
  return linkPluginKey.getState(state);
}
