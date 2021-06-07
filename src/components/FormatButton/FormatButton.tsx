import { classNames } from "lumastic-ui/helpers";
import { Command } from "prosemirror-commands";
import React from "react";
import { isMarkActive } from "../../commands/isMarkActive";
import {
  useEditorContext,
  useProviderContext
} from "../../core/context/useEditorContext";
import style from "./FormatButton.scss";

type FormatButtonProps = {
  command: Command;
  mark: string;
  className?: string;
  children?: React.ReactNode;
};

const FormatButton = ({
  command,
  mark,
  className,
  children
}: FormatButtonProps): React.ReactElement => {
  const { viewProvider } = useProviderContext();
  const hello = useEditorContext({ autoUpdate: true });
  const { isInitialized } = viewProvider;
  if (!isInitialized) return null;
  return (
    <button
      className={classNames(
        style.formatbutton,
        {
          [style.active]: isMarkActive(
            viewProvider.editorView.state,
            viewProvider.editorView.state?.schema.marks[mark]
          )
        },
        className
      )}
      data-testid={"formatbutton"}
      onMouseDown={(e) => {
        e.preventDefault();
        viewProvider.editorView.focus();
        command(
          viewProvider.editorView.state,
          viewProvider.editorView.dispatch,
          viewProvider.editorView
        );
      }}
    >
      {children}
    </button>
  );
};

export default FormatButton;
