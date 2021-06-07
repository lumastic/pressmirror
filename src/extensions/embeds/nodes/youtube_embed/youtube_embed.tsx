import { Node, NodeSpec } from "prosemirror-model";
import { EditorView, NodeView } from "prosemirror-view";
import React, { forwardRef, useCallback, useEffect, useState } from "react";
import { ProviderContext } from "../../../../core/types";
import {
  ReactComponentProps,
  ReactNodeView
} from "../../../../core/views/ReactNodeView";
import styles from "./youtube_embed.scss";

// eslint-disable-next-line react/display-name
const YouTubeEmbed = forwardRef(
  (
    { initialProps, useListenProps, setAttrs }: ReactComponentProps,
    ref
  ): React.ReactElement => {
    // Setup state handling for the ReactNodeView
    const [state, setState] = useState(initialProps.attrs as youtubeEmbedAttrs);
    useListenProps(handleAttrsUpdate);
    function handleAttrsUpdate(newProps) {
      setState(newProps.attrs);
    }
    const [loading, setLoading] = useState(false);
    const [showEmbed, setEmbed] = useState(true);
    const checkId = useCallback(() => {
      if (!state.url) {
        const url = window.prompt("Paste in a YouTube link...");
        setAttrs({ url });
      }
      if (state.url && (!state.embedURL || !state.videoId)) {
        let videoId;
        const match = state.url
          .replace(/(>|<)/gi, "")
          .split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
        if (match[2]) {
          [videoId] = match[2].split(/[^0-9a-z_-]/i);
        } else {
          videoId = match;
        }
        setAttrs({
          embedUrl: `https://www.youtube.com/embed/${videoId}`,
          videoId
        });
      }
    }, [state]);
    // On state change or first render, checkScrape
    useEffect(() => {
      checkId();
    }, [checkId]);
    return (
      <div className={styles.container}>
        {showEmbed ? (
          <div className={styles.fluidMedia}>
            <iframe
              src={state.embedURL}
              frameBorder="0"
              width="100%"
              allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="YT video"
            />
          </div>
        ) : null}
      </div>
    );
    // return <div ref={ref} className={"heading"} />;
  }
);

type youtubeEmbedAttrs = {
  url: string;
  embedURL: string;
  videoId: string;
  title: string;
  thumbnailURL: string;
};

export const youtube_embed: NodeSpec = {
  group: "block",
  attrs: {
    url: { default: "" },
    embedURL: { default: null },
    videoId: { default: null },
    title: { default: "" },
    thumbnailURL: { default: "" }
  },
  parseDOM: [{ tag: "div", attrs: { ["data-type"]: "youtube_embed" } }],
  toDOM() {
    return ["div", { ["data-type"]: "youtube_embed" }];
  }
};

export function youtubeNodeView(
  ctx: ProviderContext,
  options?: Record<string, unknown>
) {
  return (
    node: Node,
    view: EditorView,
    getPos: (() => number) | boolean
  ): NodeView =>
    new ReactNodeView(
      node,
      view,
      getPos,
      ctx,
      { options },
      YouTubeEmbed
    ).init();
}

export default youtube_embed;
