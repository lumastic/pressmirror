import { Node, NodeSpec } from "prosemirror-model";
import { EditorView, NodeView } from "prosemirror-view";
import React, { forwardRef, useCallback, useEffect, useState } from "react";
import { Type, LoadingSpinner } from "lumastic-ui";
import { classNames } from "lumastic-ui/helpers";
import { EditorContext } from "../../../core/types";
import {
  ReactNodeView,
  ReactComponentProps
} from "../../../core/views/ReactNodeView";
import moment from "moment";
import styles from "./link_node.scss";

// eslint-disable-next-line react/display-name
const LinkNode = forwardRef(
  (
    { initialProps, useListenProps, callbacks, setAttrs }: ReactComponentProps,
    ref
  ): React.ReactElement => {
    // Setup state handling for the ReactNodeView
    const [state, setState] = useState(initialProps.attrs as linkNodeAttrs);
    useListenProps(handlePropsUpdate);
    function handlePropsUpdate(newProps) {
      setState(newProps.attrs);
    }
    const [loading, setLoading] = useState(false);
    const checkScrape = useCallback(async () => {
      // Check if last scrape was more than 1 month ago
      if (
        new Date(state.lastScrape) <
        new Date(moment().utc().subtract(1, "months").format())
      ) {
        // Set loading state to true and scrape the link
        setLoading(true);
        const scrape = await callbacks.scrapeLink(state.url);
        // Set new attrs to reflect scraped data
        setAttrs({ ...scrape, lastScrape: moment().utc().format() });
        // Set loading to false
        setLoading(false);
      }
    }, [state]);
    // On state change or first render, checkScrape
    useEffect(() => {
      checkScrape();
    }, [checkScrape]);
    return (
      <a
        href={state.url}
        className={classNames(styles.container, { [styles.loading]: loading })}
      >
        {!loading ? (
          <>
            <div
              className={styles.img}
              style={{
                backgroundImage: `url(${
                  state.image ||
                  (state.favicon?.[0] === "/"
                    ? `${state.base}${state.favicon}`
                    : state.favicon)
                })`
              }}
            />
            <div className={styles.text}>
              <Type gutterBottom>{state.title}</Type>
              <Type caption color="grey">
                {state.base}
              </Type>
            </div>
          </>
        ) : (
          <div>
            <Type align="center">
              <LoadingSpinner />
            </Type>
            <Type align="center" color="secondary">
              Loading link...
            </Type>
          </div>
        )}
      </a>
    );
    // return <div ref={ref} className={"heading"} />;
  }
);

type linkNodeAttrs = {
  url: string;
  base: string;
  image: string;
  title: string;
  favicon: string;
  lastScrape: string | null;
};

const link_node: NodeSpec = {
  group: "block",
  attrs: {
    url: { default: "" },
    base: { default: "" },
    image: { default: "" },
    title: { default: "" },
    favicon: { default: "" },
    lastScrape: { default: null }
  },
  parseDOM: [{ tag: "a", attrs: { ["data-type"]: "link_node" } }],
  toDOM() {
    return ["a", { ["data-type"]: "link_node" }];
  }
};

export function linkNodeView(
  ctx: EditorContext,
  options?: Record<string, unknown>
) {
  return (
    node: Node,
    view: EditorView,
    getPos: (() => number) | boolean
  ): NodeView =>
    new ReactNodeView(node, view, getPos, ctx, { options }, LinkNode).init();
}

export default link_node;
