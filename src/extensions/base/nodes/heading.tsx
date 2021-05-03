import { Node, NodeSpec } from "prosemirror-model";
import { EditorView, NodeView } from "prosemirror-view";
import { EditorContext } from "../../../core/types";
import { ReactNodeView } from "../../../core/views/ReactNodeView";
import { Type } from "lumastic-ui";
import React, { forwardRef, useState } from "react";

// eslint-disable-next-line react/display-name
const Heading = forwardRef(
  (props: any = {}, ref): React.ReactElement => {
    const { initialProps, useListenProps } = props;
    useListenProps(handlePropsUpdate);
    const [level, setLevel] = useState(initialProps.attrs.level);
    function handlePropsUpdate(newProps: any) {
      setLevel(newProps.attrs.level);
    }
    return <Type {...{ [`h${level}`]: true }} ref={ref} />;
    // return <div ref={ref} className={"heading"} />;
  }
);

const heading: NodeSpec = {
  attrs: { level: { default: 1 } },
  content: "inline*",
  group: "block",
  defining: true,
  parseDOM: [
    { tag: "h1", attrs: { level: 1 } },
    { tag: "h2", attrs: { level: 2 } },
    { tag: "h3", attrs: { level: 3 } },
    { tag: "h4", attrs: { level: 4 } },
    { tag: "h5", attrs: { level: 5 } },
    { tag: "h6", attrs: { level: 6 } }
  ],
  toDOM(node) {
    return ["h" + node.attrs.level, 0];
  }
};

export class HeadingView extends ReactNodeView {
  createContentDOM(): HTMLElement {
    const contentDOM = document.createElement("div");
    contentDOM.classList.add(`content-dom`);
    return contentDOM;
  }
}

export function headingNodeView(
  ctx: EditorContext,
  options?: Record<string, unknown>
) {
  return (
    node: Node,
    view: EditorView,
    getPos: (() => number) | boolean
  ): NodeView =>
    new HeadingView(node, view, getPos, ctx, { options }, Heading).init();
}

export default heading;
