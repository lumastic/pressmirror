import { EditorState, Plugin } from "prosemirror-state";
import { Decoration, DecorationSet } from "prosemirror-view";
import { placeholderPluginKey } from "./placeholderPluginKey";

export const placeholderPluginFactory = ({
  text = "",
  className = "ProseMirror__placeholder"
}: PlaceholderPluginProps): Plugin =>
  new Plugin({
    key: placeholderPluginKey,
    props: {
      decorations(state) {
        const doc = state.doc;
        const hasNoChildren = doc.childCount === 0;
        const isEmptyTextBlock =
          doc.childCount === 1 &&
          doc.firstChild.isTextblock &&
          doc.firstChild.content.size === 0;

        if (hasNoChildren || isEmptyTextBlock) {
          const position = doc.inlineContent ? 0 : 1;
          const placeholder = document.createElement("span");
          placeholder.classList.add(className);
          placeholder.setAttribute("data-placeholder", text);

          return DecorationSet.create(doc, [
            Decoration.widget(position, placeholder)
          ]);
        }
      }
    }
    // state: {
    //   init(): PlaceholderPluginProps {
    //     console.log(text);
    //     return {
    //       text
    //     };
    //   },
    //   apply(transaction: Transaction, prevFocused): PlaceholderPluginProps {
    //     console.log(text);
    //     return prevFocused;
    //   }
    // }
  });

export function getEditorFocus(state: EditorState): boolean {
  return placeholderPluginFactory({}).getState(state);
}

export type PlaceholderPluginProps = {
  text?: string;
  className?: string;
};
