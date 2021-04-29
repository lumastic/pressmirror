import { Command, toggleMark } from "prosemirror-commands";
import { EditorState, Transaction } from "prosemirror-state";

function toggleMarkCommand(mark: string): Command {
  return (
    state: EditorState,
    dispatch: ((tr: Transaction) => void) | undefined
  ) => toggleMark(state.schema.marks[mark])(state, dispatch);
}

export default toggleMarkCommand;
