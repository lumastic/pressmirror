import { createGzip } from "node:zlib";
import { Plugin } from "prosemirror-state";
import { EditorContext } from "../../core/types";
import { linkPluginKey } from "./linkPluginKey";
import { linkNodeView } from "./node";

const linkRegex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;
export type LinkPluginState = {
  focus: boolean;
};

export function linkPluginFactory(
  ctx: EditorContext,
  options: Record<string, unknown>
): Plugin {
  return new Plugin({
    key: linkPluginKey,
    props: {
      handlePaste: (view, event) => {
        const pasteString = event.clipboardData.getData("text");
        if (pasteString.match(linkRegex)) {
          const { $from } = view.state.selection;
          const newLinkNode = view.state.schema.nodes.link_node.createAndFill({
            url: pasteString
          });
          view.dispatch(view.state.tr.insert($from.end() + 1, newLinkNode));
          return true;
        }
        return false;
      },
      nodeViews: {
        link_node: linkNodeView(ctx, options)
      }
    }
  });
}
