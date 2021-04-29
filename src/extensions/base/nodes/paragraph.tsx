import { DOMOutputSpec, NodeSpec } from "prosemirror-model";

const paragraph: NodeSpec = {
  content: "inline*",
  group: "block",
  parseDOM: [{ tag: "p" }],
  toDOM(): DOMOutputSpec {
    return ["p", 0];
  }
};

export default paragraph;
