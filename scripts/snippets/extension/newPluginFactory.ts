import { Plugin } from "prosemirror-state";
import { EditorContext } from "../../core/types";
import { NEW_EXTENSION_LOWERPluginKey } from "./NEW_EXTENSION_LOWERPluginKey";

export function NEW_EXTENSION_LOWERPluginFactory(
  ctx: EditorContext,
  options: Record<string, unknown>
): Plugin {
    return new Plugin({
        key: NEW_EXTENSION_LOWERPluginKey
      });
}

export type NEW_EXTENSIONState = {
  focus: boolean;
};
