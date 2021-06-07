import { Button } from "lumastic-ui";
import { Node, NodeSpec } from "prosemirror-model";
import { EditorView, NodeView } from "prosemirror-view";
import React, { forwardRef, useState } from "react";
import { ProviderContext } from "../../../core/types";
import { ReactNodeView } from "../../../core/views/ReactNodeView";

// eslint-disable-next-line react/display-name
const Count = forwardRef(
  (props: any = {}, ref): React.ReactElement => {
    const { setAttrs, useListenProps, initialProps } = props;
    const [count, setCount] = useState(initialProps.attrs.count);
    useListenProps(handlePropsUpdate);
    function handlePropsUpdate(newProps) {
      setCount(newProps.attrs.count);
    }
    function increase() {
      setAttrs({ count: count + 1 });
    }
    function decrease() {
      setAttrs({ count: count - 1 });
    }

    return (
      <div>
        <Button onClick={increase} variant="contained" color="green">
          Increase Count
        </Button>
        <Button onClick={decrease} variant="contained" color="red">
          Decrease Count
        </Button>
      </div>
    );
    // return <div ref={ref} className={"heading"} />;
  }
);

const count: NodeSpec = {
  attrs: { count: { default: 0 } },
  defining: true,
  group: "block",
  atom: true,
  isolating: true,
  toDOM() {
    return ["div", 0];
  }
};

export function countNodeView(
  ctx: ProviderContext,
  options?: Record<string, unknown>
) {
  return (
    node: Node,
    view: EditorView,
    getPos: (() => number) | boolean
  ): NodeView =>
    new ReactNodeView(node, view, getPos, ctx, { options }, Count).init();
}

export default count;
