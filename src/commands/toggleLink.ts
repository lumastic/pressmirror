import { toggleMark } from "prosemirror-commands";
import { EditorState, Transaction } from "prosemirror-state";
import { isMarkActive } from "./isMarkActive";

export function toggleLink(
  state: EditorState,
  dispatch: ((tr: Transaction) => void) | undefined
): boolean {
  const linkMark = state.schema.marks.link;
  if (isMarkActive(state, linkMark)) {
    toggleMark(linkMark)(state, dispatch);
    return true;
  }
  const href = window.prompt("Enter a link", "");
  toggleMark(linkMark, { href })(state, dispatch);
  //   return true;
}
