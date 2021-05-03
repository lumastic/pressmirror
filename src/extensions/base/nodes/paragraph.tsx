import { Type } from "lumastic-ui";
import { DOMOutputSpec, Node, NodeSpec } from "prosemirror-model";
import { EditorView, NodeView } from "prosemirror-view";
import React, { forwardRef } from "react";
import { EditorContext } from "../../../core/types";
import { ReactNodeView } from "../../../core/views/ReactNodeView";

// eslint-disable-next-line react/display-name
const Paragraph = forwardRef(
  (props: any = {}, ref): React.ReactElement => {
    return <Type tag="div" ref={ref} />;
    // return <div ref={ref} className={"heading"} />;
  }
);

const paragraph: NodeSpec = {
  content: "inline*",
  group: "block",
  parseDOM: [{ tag: "p" }],
  toDOM(): DOMOutputSpec {
    return ["p", 0];
  }
};

export class ParagraphView extends ReactNodeView {
  createContentDOM(): HTMLElement {
    const contentDOM = document.createElement("div");
    contentDOM.classList.add(`content-dom`);
    return contentDOM;
  }
}

export function paragraphNodeView(
  ctx: EditorContext,
  options?: Record<string, unknown>
) {
  return (
    node: Node,
    view: EditorView,
    getPos: (() => number) | boolean
  ): NodeView =>
    new ParagraphView(node, view, getPos, ctx, { options }, Paragraph).init();
}

export default paragraph;
