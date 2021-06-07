import React, { ReactElement, useEffect, useRef, useState } from "react";
import { DirectEditorProps, EditorView } from "prosemirror-view";
import { EditorState, Transaction } from "prosemirror-state";
import { EditorProps } from "./types";
import {
  useEditorContext,
  useProviderContext
} from "./context/useEditorContext";
import "prosemirror-view/style/prosemirror.css";
import { suggestionPluginKey } from "../extensions/suggestion";

export function Editor(props: EditorProps): ReactElement {
  const ctx = useProviderContext();
  const {
    viewProvider,
    extensionProvider,
    // analyticsProvider,
    // collabProvider,
    portalProvider
  } = ctx;
  const { updateHandlers } = useEditorContext();
  // suggestionPluginKey.getState(viewProvider._editorView.state);
  const editorViewRef = useRef(null);
  const [canDispatchTransactions, setCanDispatchTransactions] = useState(true);

  useEffect(() => {
    const state = createEditorState();
    const editorViewDOM = editorViewRef.current;
    if (editorViewDOM) {
      const pmEditorProps = createDirectEditorProps(state);
      const view = createEditorView(editorViewDOM, pmEditorProps);
      viewProvider.init(view);
      if (props.onEditorReady) {
        props.onEditorReady(ctx, state);
      }
      updateHandlers(ctx);
    }
    return () => {
      viewProvider.editorView.destroy();
    };
  }, []);

  function createEditorState() {
    const schema = extensionProvider.createSchema();
    return EditorState.create({
      schema,
      plugins: extensionProvider.createPlugins(),
      doc: props.initialDoc && schema.nodeFromJSON(props.initialDoc)
    });
  }

  function createEditorView(
    element: HTMLDivElement,
    editorProps: DirectEditorProps
  ) {
    const view = new EditorView({ mount: element }, editorProps);
    return view;
  }

  function createDirectEditorProps(state: EditorState): DirectEditorProps {
    return {
      state,
      dispatchTransaction: (tr: Transaction) => {
        // Block stale transactions:
        // Prevent runtime exceptions from async transactions that would attempt to
        // update the DOM after React has unmounted the Editor.
        if (canDispatchTransactions) {
          dispatchTransaction(tr);
        }
      },
      // Disables the contentEditable attribute of the editor if the editor is disabled
      editable: (_state) => !props.readOnly,
      attributes: { "data-gramm": "false" }
    };
  }

  function dispatchTransaction(transaction: Transaction) {
    const { editorView } = viewProvider;

    if (!editorView) {
      return;
    }

    // analyticsProvider.perf.warn("EditorView", "dispatchTransaction");
    const oldEditorState = editorView.state;
    // go ahead and update the state now we know the transaction is good
    // analyticsProvider.perf.info(
    //   "EditorView",
    //   "dispatchTransaction state::apply"
    // );
    const editorState = editorView.state.apply(transaction);
    // analyticsProvider.perf.stop(
    //   "EditorView",
    //   "dispatchTransaction state::apply",
    //   200
    // );

    if (editorState === oldEditorState) {
      // I don't think it's possible for the React nodeviews to change without changing PM editorState but
      // it's better to be safe than sorry I guess.
      portalProvider.flush();
      return;
    }
    // analyticsProvider.perf.warn(
    //   "EditorView",
    //   "dispatchTransaction updateState"
    // );
    editorView.updateState(editorState);
    // analyticsProvider.perf.stop(
    //   "EditorView",
    //   "dispatchTransaction updateState",
    //   100
    // );
    // analyticsProvider.perf.debug("EditorView", "dispatchTransaction flush");
    portalProvider.flush();
    // analyticsProvider.perf.stop("EditorView", "dispatchTransaction flush", 100);
    // A bit hackish way to stop triggering sync events when the whole document is replaced by the user
    if (!transaction.getMeta("SKIP_AFTER_TR")) {
      afterTrHooks(editorState);
    }
    // analyticsProvider.perf.stop("EditorView", "dispatchTransaction", 1000);
  }

  function afterTrHooks(newState: EditorState) {
    if (props.onDocumentEdit) {
      props.onDocumentEdit(newState);
    }
    updateHandlers(ctx);
    // if (collabProvider.isCollaborating) {
    // collabProvider.sendSteps(newState);
    // }
  }

  return (
    <div
      ref={editorViewRef}
      style={{ outline: "none" }}
      className={props.className}
    >
      {props.children}
    </div>
  );
}
