import { DOMOutputSpec, DOMOutputSpecArray, MarkSpec } from "prosemirror-model";

const emDOM: DOMOutputSpecArray = ["em", 0];

const italic: MarkSpec = {
  parseDOM: [{ tag: "i" }, { tag: "em" }, { style: "font-style=italic" }],
  toDOM(): DOMOutputSpec {
    return emDOM;
  }
};

export default italic;
