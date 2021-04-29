import { createContext, useContext } from "react";
import { EditorContext } from "../types";
import { createDefaultProviders } from "../providers";

export const ReactEditorContext = createContext<EditorContext>(
  createDefaultProviders()
);

export const useEditorContext = () => useContext(ReactEditorContext);
