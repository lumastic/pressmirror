import { NodeSpec } from "prosemirror-model";

const hard_break: NodeSpec = {
  inline: true,
  group: "inline",
  selectable: false,
  parseDOM: [{ tag: "br" }],
  toDOM() {
    return ["br"];
  }
};

export default hard_break;
