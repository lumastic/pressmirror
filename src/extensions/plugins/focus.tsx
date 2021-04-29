import { Plugin, PluginKey, EditorState, Transaction } from "prosemirror-state";
import { EditorView } from "prosemirror-view";

const focusPluginKey = new PluginKey("focus");

export const focusPluginFactory = new Plugin({
  key: focusPluginKey,
  state: {
    init() {
      return false;
    },
    apply(transaction: Transaction, prevFocused) {
      const focused = transaction.getMeta(focusPluginKey);
      if (typeof focused === "boolean") {
        return focused;
      }
      return prevFocused;
    }
  },
  props: {
    handleDOMEvents: {
      blur: (view: EditorView) => {
        view.dispatch(view.state.tr.setMeta(focusPluginKey, false));
        return false;
      },
      focus: (view: EditorView) => {
        view.dispatch(view.state.tr.setMeta(focusPluginKey, true));
        return false;
      }
    }
  }
});

export function getEditorFocus(state: EditorState): boolean {
  return focusPluginFactory.getState(state);
}
