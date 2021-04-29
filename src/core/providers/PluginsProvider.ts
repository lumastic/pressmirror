import { EventDispatcher } from "../EventDispatcher";
import { PluginKey } from "../../extensions/PluginKey";

interface PluginState {
  [key: string]: any;
}

export class PluginsProvider {
  dispatcher: EventDispatcher = new EventDispatcher();

  publish(pluginKey: PluginKey, nextPluginState: PluginState): void {
    this.dispatcher.emit(pluginKey.name, nextPluginState);
  }

  subscribe(pluginKey: PluginKey, cb: (data: any) => void): void {
    this.dispatcher.on(pluginKey.name, cb);
  }

  unsubscribe(pluginKey: PluginKey, cb: (data: any) => void): void {
    this.dispatcher.off(pluginKey.name, cb);
  }
}
