import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";
import { createDefaultProviders } from "../providers";
import { EditorContextType, ProviderContextType } from "../types";

export const ProviderContext = createContext<ProviderContextType>(
  createDefaultProviders()
);

export const useProviderContext = () => useContext(ProviderContext);

export const EditorContext = createContext<EditorContextType | null>(null);

export const useEditorContext = (
  handler?: ((_any: any) => void) | { autoUpdate: boolean }
): EditorContextType => {
  const context = useContext(EditorContext);
  const { registerHandler } = context;

  // A helper for forcing an update of the state.
  const forceUpdate = useRef(useForceUpdate());

  // Manages the update frequency of this hook.
  useEffect(() => {
    let updateHandler = handler;

    // Default state, do nothing.
    if (!updateHandler) {
      return;
    }

    // Use the `forceUpdate` handler when `autoUpdate` is true.
    if (typeof updateHandler === "object") {
      const { autoUpdate } = updateHandler;
      updateHandler = autoUpdate ? () => forceUpdate.current() : undefined;
    }

    if (!(typeof updateHandler === "function")) {
      return;
    }

    // Add the update handler which will update this hook every time the editor
    // is updated.
    return registerHandler("update", updateHandler);
  }, []);

  return context;
};

export function useForceUpdate(): () => void {
  const [, setState] = useState(Object.create(null));

  return useCallback((): void => {
    setState(Object.create(null));
  }, []);
}
