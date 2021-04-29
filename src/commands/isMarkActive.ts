import { MarkType } from "prosemirror-model";
import { schema } from "prosemirror-schema-basic";
import { EditorState } from "prosemirror-state";

export function isBold(state: EditorState): boolean {
  return isMarkActive(state, schema.marks.strong);
}

export function isItalic(state: EditorState): boolean {
  return isMarkActive(state, schema.marks.em);
}

export function isMarkActive(state: EditorState, mark: MarkType): boolean {
  const { from, $from, to, empty } = state.selection;
  return empty
    ? !!mark.isInSet(state.storedMarks || $from.marks())
    : state.doc.rangeHasMark(from, to, mark);
}
