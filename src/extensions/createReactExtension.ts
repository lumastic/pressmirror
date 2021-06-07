import { ReactElement, useEffect, useLayoutEffect, useMemo } from "react";
import { useProviderContext } from "../core/context/useEditorContext";
import { ProviderContext } from "../core/types";
import { Extension } from "./Extension";

export const createReactExtension = <T>(
  Ext: new (ctx: ProviderContext, props: T) => Extension<T>
) => (props: T): ReactElement => {
  const ctx = useProviderContext();
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
