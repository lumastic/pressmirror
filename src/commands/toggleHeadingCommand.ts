import { Command, setBlockType } from "prosemirror-commands";
import { EditorState, Selection, Transaction } from "prosemirror-state";

function toggleHeadingCommand(level: number): Command {
  return (state: EditorState, dispatch: (tr: Transaction) => void): boolean => {
    const { $from } = state.selection;
    const type = $from.parent.type;
    if (type !== state.schema.nodes.heading) {
      setBlockType(state.schema.nodes.heading, { level })(state, dispatch);
    } else {
      setBlockType(state.schema.nodes.paragraph)(state, dispatch);
    }
    return true;
  };
}

export default toggleHeadingCommand;
