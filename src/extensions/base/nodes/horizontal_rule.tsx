import { NodeSpec } from "prosemirror-model";

const horizontal_rule: NodeSpec = {
  group: "block",
  parseDOM: [{ tag: "hr" }],
  toDOM() {
    return ["hr"];
  }
};

export default horizontal_rule;
