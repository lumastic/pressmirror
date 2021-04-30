import { MarkType } from "prosemirror-model";
import { EditorState } from "prosemirror-state";

export function isBold(state: EditorState): boolean {
  return isMarkActive(state, state.schema.marks.strong);
}

export function isItalic(state: EditorState): boolean {
  return isMarkActive(state, state.schema.marks.italic);
}

export function isMarkActive(state: EditorState, mark: MarkType): boolean {
  const { from, $from, to, empty } = state.selection;
  return empty
    ? !!mark.isInSet(state.storedMarks || $from.marks())
    : state.doc.rangeHasMark(from, to, mark);
}
