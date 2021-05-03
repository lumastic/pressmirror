import { Button } from "lumastic-ui";
import { Node, NodeSpec } from "prosemirror-model";
import { EditorView, NodeView } from "prosemirror-view";
import React, { forwardRef, useState } from "react";
import { EditorContext } from "../../../core/types";
import { ReactNodeView } from "../../../core/views/ReactNodeView";

// eslint-disable-next-line react/display-name
const Random = forwardRef(
  (props: any = {}, ref): React.ReactElement => {
    const { setAttrs } = props;
    console.log(props);
    return (
      <div ref={ref}>
        <Button onClick={() => setAttrs({ poop: 1 })}>Henlo</Button>
      </div>
    );
    // return <div ref={ref} className={"heading"} />;
  }
);

const random: NodeSpec = {
  attrs: { poop: { default: 0 } },
  defining: true,
  group: "block",
  toDOM(node) {
    return ["div", 0];
  }
};

export function randomNodeView(
  ctx: EditorContext,
  options?: Record<string, unknown>
) {
  return (
    node: Node,
    view: EditorView,
    getPos: (() => number) | boolean
  ): NodeView =>
    new ReactNodeView(node, view, getPos, ctx, { options }, Random).init();
}

export default random;
