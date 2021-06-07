import React, { ReactNode, useCallback, useMemo, useReducer } from "react";
import { createDefaultProviders } from "../providers";
import { Callbacks } from "../providers/CallbacksProvider";
import { ProviderContextType } from "../types";
import { EditorContext, ProviderContext } from "./useEditorContext";

export const EditorManager = ({
  children,
  callbacks
}: EditorManagerProps): React.ReactElement => {
  const providers = useMemo(() => createDefaultProviders(callbacks), []);
  const handlerReducer = (curr, { type, handler }) => {
    switch (type) {
      case "update":
        const currUpdate = curr["update"];
        console.log(curr);
        currUpdate.push(handler);
        return { ...curr, update: currUpdate };
      default:
        return curr;
    }
  };
  const [handlers, handlerDispatch] = useReducer(handlerReducer, {
    update: [] // Handlers that should be run onMount and onEditDocument
  });
  const updateHandlers = useCallback(
    (ctx: ProviderContextType) => {
      handlers.update.forEach((handler: (_any: any) => void) => {
        handler(ctx);
      });
    },
    [handlers]
  );
  const registerHandler = useCallback(
    (type, handler) => {
      handlerDispatch({ type, handler });
    },
    [handlerDispatch]
  );
  const editorValue = useMemo(() => ({ updateHandlers, registerHandler }), [
    updateHandlers,
    registerHandler
  ]);
  return (
    <ProviderContext.Provider value={providers}>
      <EditorContext.Provider value={editorValue}>
        {children}
      </EditorContext.Provider>
    </ProviderContext.Provider>
  );
};

export type EditorManagerProps = {
  children: ReactNode;
  callbacks: Callbacks;
};
