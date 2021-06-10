import { MenuItem, Modal, PopupMenu, Type } from "lumastic-ui";
import { Command } from "prosemirror-commands";
import { EditorState, Selection, Transaction } from "prosemirror-state";
import React, {
  createElement,
  FunctionComponent,
  ReactNode,
  useCallback,
  useEffect,
  useState
} from "react";
import {
  useEditorContext,
  useProviderContext
} from "../../core/context/useEditorContext";
import { ProviderContextType } from "../../core/types";
import { suggestionPluginKey } from "../../extensions/suggestion";
import { SuggestionState } from "../../extensions/suggestion/suggestionPluginFactory";

type BlockSelectionProps = {
  type?: string;
  searchFunction?: (
    text: string
  ) => Promise<({ nodeName: string } | Record<string, any>)[]>;
  renderResult?: FunctionComponent<any>;
};

const BlockSelection = ({
  type = "block",
  searchFunction = async (t) =>
    blocks.filter((block) => block.tags.search(t) !== -1),
  renderResult = ({ title }) => <Type body2>{title}</Type>
}: BlockSelectionProps): React.ReactElement => {
  const [isShowing, setShowing] = useState(false);
  const [text, setText] = useState(null);
  const [results, setResults] = useState([]);
  const [range, setRange] = useState(null);
  const [menuRef, setMenuRef] = useState(null);
  const { viewProvider } = useProviderContext();
  useEditorContext((ctx: ProviderContextType) => {
    const view = ctx.viewProvider.editorView;
    const suggestState = suggestionPluginKey.getState(
      view.state
    ) as SuggestionState;
    if (suggestState.active && suggestState.type === type) {
      setShowing(true);
      setText(suggestState.text);
      setRange({
        start: view.coordsAtPos(suggestState.range.from),
        ...suggestState.range
      });
    } else {
      setShowing(false);
      setText(null);
      setRange(null);
    }
  });

  useEffect(() => {
    const searchTrigger = async () => {
      const searchResults = await searchFunction(text);
      setResults(searchResults);
    };
    searchTrigger();
  }, [text]);

  useEffect(() => {
    if (range && menuRef) {
      const { start } = range;
      try {
        const offsetParentBox = menuRef.offsetParent.getBoundingClientRect();
        let left = start.left;
        if (left < 5) {
          left = 5;
        }
        menuRef.style.left = left + "px";
        menuRef.style.top = start.bottom + offsetParentBox.top + 8 + "px";
      } catch {
        console.error("FloatingMenu couldn't calculate it's position");
      }
    }
  }, [range, menuRef]);

  const insertBlock = useCallback(
    (nodeName, attrs): Command => {
      return (
        state: EditorState,
        dispatch: (tr: Transaction) => void
      ): boolean => {
        let tr = state.tr;
        const $anchor = tr.doc.resolve(range.from);
        const $head = tr.doc.resolve(range.to);
        tr = tr.setSelection(new Selection($anchor, $head));
        tr = tr.replaceSelectionWith(state.schema.node(nodeName, attrs));
        // if(state.schema.nodes[nodeName].isTextblock) {

        // }
        dispatch(tr);
        return true;
      };
    },
    [range]
  );
  if (!viewProvider.isInitialized) return null;
  return (
    <Modal isShowing={isShowing && results.length}>
      <div ref={setMenuRef} style={{ position: "absolute" }}>
        <PopupMenu triggerEl={{ current: viewProvider.editorView }}>
          {results.map((result) => {
            return (
              <MenuItem
                key={result.key || result.id}
                onClick={() => {
                  insertBlock(result.nodeName, result.nodeAttrs)(
                    viewProvider.editorView.state,
                    viewProvider.editorView.dispatch
                  );
                  viewProvider.editorView.focus();
                }}
              >
                {createElement(renderResult, { ...result })}
              </MenuItem>
            );
          })}
        </PopupMenu>
      </div>
    </Modal>
  );
};

export default BlockSelection;

const blocks = [
  {
    title: "Text",
    key: "text",
    nodeName: "paragraph",
    tags: "paragraph text"
  },
  {
    title: "Heading 1",
    key: "heading1",
    nodeName: "heading",
    tags: "heading1 title text"
  },
  {
    title: "Heading 2",
    key: "heading2",
    nodeName: "heading",
    nodeAttrs: { level: 2 },
    tags: "heading2 title text"
  },
  {
    title: "Heading 3",
    key: "heading3",
    nodeName: "heading",
    nodeAttrs: { level: 3 },
    tags: "heading3 title text"
  },
  {
    title: "YouTube Video",
    key: "youtube_embed",
    nodeName: "youtube_embed",
    tags: "youtube video embed"
  },
  {
    title: "Todo list",
    key: "checklist",
    nodeName: "checklist",
    tags: "todo todolist check checklist task tasklist"
  }
];
