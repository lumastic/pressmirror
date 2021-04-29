import { Schema } from "prosemirror-model";
import { Plugin } from "prosemirror-state";
import { createPlugins } from "../../extensions/createPlugins";
import { createSchema } from "../../extensions/createSchema";
import { Extension } from "../../extensions/Extension";

export class ExtensionProvider {
  extensions: Set<Extension<any>> = new Set();

  register(extension: Extension<any>): void {
    this.extensions.add(extension);
  }

  unregister(extension: Extension<any>): void {
    this.extensions.delete(extension);
  }

  createSchema(): Schema {
    return createSchema(Array.from(this.extensions.values()));
  }

  createPlugins(): Plugin[] {
    return createPlugins(Array.from(this.extensions.values()));
  }
}
