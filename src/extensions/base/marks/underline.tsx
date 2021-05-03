import { DOMOutputSpec, DOMOutputSpecArray, MarkSpec } from "prosemirror-model";

const underlineDOM: DOMOutputSpecArray = ["u", 0];

const underline: MarkSpec = {
  parseDOM: [{ tag: "i" }, { tag: "em" }, { style: "font-style=underline" }],
  toDOM(): DOMOutputSpec {
    return underlineDOM;
  }
};

export default underline;
