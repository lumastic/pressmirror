import { Plugin } from "prosemirror-state";
import { getActiveMarks } from "../../commands/getActiveMarks";
import { ProviderContextType } from "../../core/types";
import { headingNodeView } from "./nodes/heading";
import { paragraphNodeView } from "./nodes/paragraph";
import { countNodeView } from "./nodes/count";
import { BaseState, basePluginKey } from "./state";

export function basePluginFactory(
  ctx: ProviderContextType,
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
    props: {
      nodeViews: {
        paragraph: paragraphNodeView(ctx, options),
        heading: headingNodeView(ctx, options),
        count: countNodeView(ctx, options)
      }
    },
    key: basePluginKey
  });
}
