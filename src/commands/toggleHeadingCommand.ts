import { chainCommands, setBlockType } from "prosemirror-commands";
import { EditorState, Selection, Transaction } from "prosemirror-state";

function toggleHeadingCommand(
  state: EditorState,
  dispatch: (tr: Transaction) => void
): boolean {
  chainCommands(toggleHeading, resetSelection);
  return true;
}

export function toggleHeading(
  state: EditorState,
  dispatch: (tr: Transaction) => void
): boolean {
  const { $from } = state.selection;
  const type = $from.parent.type;
  if (type !== state.schema.nodes.heading) {
    setBlockType(state.schema.nodes.heading)(state, dispatch);
  } else {
    setBlockType(state.schema.nodes.paragraph)(state, dispatch);
  }
  return true;
}
export function resetSelection(
  state: EditorState,
  dispatch: (tr: Transaction) => void
): boolean {
  const { $from, $anchor, $head } = state.selection;
  console.log(state.doc.resolve($from.pos));
  dispatch(state.tr.setSelection(new Selection($anchor, $head)));
  return true;
}

export default toggleHeadingCommand;
