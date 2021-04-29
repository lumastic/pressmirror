import { NodeSpec } from "prosemirror-model";

const code_block: NodeSpec = {
  content: "text*",
  marks: "",
  group: "block",
  code: true,
  defining: true,
  parseDOM: [{ tag: "pre", preserveWhitespace: "full" }],
  toDOM() {
    return ["pre", ["code", 0]];
  }
};

export default code_block;
