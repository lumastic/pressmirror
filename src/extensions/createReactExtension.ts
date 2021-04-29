import { ReactElement, useEffect, useLayoutEffect, useMemo } from "react";
import { useEditorContext } from "../core/context/useEditorContext";
import { EditorContext } from "../core/types";
import { Extension } from "./Extension";

export const createReactExtension = <T>(
  Ext: new (ctx: EditorContext, props: T) => Extension<T>
) => (props: T): ReactElement => {
  const ctx = useEditorContext();
  const { extensionProvider } = ctx;
  const extension = useMemo(() => new Ext(ctx, props), []);
  useLayoutEffect(() => {
    extensionProvider.register(extension);
    return () => {
      extensionProvider.unregister(extension);
    };
  }, []);
  useEffect(() => {
    extension.onPropsChanged(props);
  }, [props]);
  return null;
};
