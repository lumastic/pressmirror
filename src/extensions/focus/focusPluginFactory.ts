import { EditorState, Plugin, Transaction } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { focusPluginKey } from "./focusPluginKey";

export type FocusPluginState = {
  focus: boolean;
};

export const focusPluginFactory = new Plugin({
  key: focusPluginKey,
  state: {
    init(): FocusPluginState {
      return {
        focus: false
      };
    },
    apply(transaction: Transaction, prevFocused): FocusPluginState {
      const focused = transaction.getMeta(focusPluginKey);
      if (typeof focused === "boolean") {
        return { focus: focused };
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
