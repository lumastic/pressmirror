import { DOMOutputSpec, DOMOutputSpecArray, MarkSpec } from "prosemirror-model";

const codeDOM: DOMOutputSpecArray = ["code", 0];

const code: MarkSpec = {
  parseDOM: [{ tag: "code" }],
  toDOM(): DOMOutputSpec {
    return codeDOM;
  }
};

export default code;
