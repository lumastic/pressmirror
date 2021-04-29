import { Plugin } from "prosemirror-state";
import { getActiveMarks } from "../../commands/getActiveMarks";
import { EditorContext } from "../../core/types";
import { BaseState, basePluginKey } from "./state";

export function basePluginFactory(
  ctx: EditorContext,
  options: Record<string, unknown>
): Plugin {
  const { pluginsProvider } = ctx;
  return new Plugin({
    state: {
      init(): BaseState {
        return {
          activeNodes: [],
          activeMarks: []
        };
      },
      apply(tr, pluginState: BaseState, _oldState, newState): BaseState {
        if (tr.docChanged || tr.selectionSet) {
          const marks = getActiveMarks(newState);
          const eqMarks =
            marks.every((m) => pluginState.activeMarks.includes(m)) &&
            marks.length === pluginState.activeMarks.length;
          if (!eqMarks) {
            const nextPluginState = {
              ...pluginState,
              activeMarks: marks
            };
            pluginsProvider.publish(basePluginKey, nextPluginState);
            return nextPluginState;
          }
        }

        return pluginState;
      }
    },
    key: basePluginKey
  });
}
