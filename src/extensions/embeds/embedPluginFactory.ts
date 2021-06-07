import { Plugin } from "prosemirror-state";
import { ProviderContext } from "../../core/types";
import { embedPluginKey } from "./embedPluginKey";
import { linkNodeView } from "./nodes";
import { youtubeNodeView } from "./nodes/youtube_embed";

export function embedPluginFactory(
  ctx: ProviderContext,
  options: Record<string, unknown>
): Plugin {
  return new Plugin({
    key: embedPluginKey,
    props: {
      handlePaste: (view, event) => {
        const pasteString = event.clipboardData.getData("text");
        const { $from } = view.state.selection;
        if (pasteString.match(youtubeRegex)) {
          const newLinkNode = view.state.schema.nodes.youtube_embed.createAndFill(
            {
              url: pasteString
            }
          );
          view.dispatch(view.state.tr.insert($from.end() + 1, newLinkNode));
          return true;
        }
        if (pasteString.match(linkRegex)) {
          const newLinkNode = view.state.schema.nodes.link_node.createAndFill({
            url: pasteString
          });
          view.dispatch(view.state.tr.insert($from.end() + 1, newLinkNode));
          return true;
        }
        return false;
      },
      nodeViews: {
        link_node: linkNodeView(ctx, options),
        youtube_embed: youtubeNodeView(ctx, options)
      }
    }
  });
}

export type EmbedPluginState = {
  focus: boolean;
};

export const youtubeRegex = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;
export const linkRegex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;
