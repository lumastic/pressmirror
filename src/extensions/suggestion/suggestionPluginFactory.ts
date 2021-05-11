import { Plugin } from "prosemirror-state";
import { EditorContext } from "../../core/types";
import { suggestionPluginKey } from "./suggestionPluginKey";

export function suggestionPluginFactory(
  ctx: EditorContext,
  options: Record<string, unknown>
): Plugin {
  return new Plugin({
    key: suggestionPluginKey
  });
}

export type SuggestionState = {
  focus: boolean;
};
