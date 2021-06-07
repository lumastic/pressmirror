import { EditorState } from "prosemirror-state";
import React, { useCallback, useState } from "react";
import { Editor } from "../../core";
import { EditorManager } from "../../core/context/EditorManager";
import { Callbacks } from "../../core/providers/CallbacksProvider";
import { ProviderContextType } from "../../core/types";
import { PortalRenderer } from "../../core/views";
import { Base, Embeds, Placeholder } from "../../extensions";
import { FloatingMenu } from "../FloatingMenu";
import { MenuBar } from "../MenuBar";
import styles from "./PressEditor.scss";

const PressEditor = ({
  debug = false,
  className = "",
  onChange,
  onMount,
  defaultValue,
  readOnly = false,
  menuBar = false,
  floatingMenu = false,
  placeholder = "Start typing...",
  callbacks
}: PressEditorProps): React.ReactElement => {
  // Setup variable to hold EditorState for debugging
  const [debugState, setDebugState] = useState<EditorState | undefined>(
    {} as EditorState
  );
  /**
   * Function run on every state change to the editor
   */
  const onDocumentEdit = useCallback(
    (newState: EditorState) => {
      if (debug) setDebugState(newState);
      if (onChange) onChange(newState);
    },
    [setDebugState]
  );
  /**
   * Function to be run when Editor is mounted and ready
   */
  const onEditorReady = useCallback(
    (context: ProviderContextType, newState: EditorState) => {
      if (onMount) onMount(newState);
      onDocumentEdit(newState);
    },
    [onDocumentEdit]
  );
  return (
    <EditorManager callbacks={callbacks}>
      <Editor
        onDocumentEdit={onDocumentEdit}
        onEditorReady={onEditorReady}
        initialDoc={defaultValue}
        className={className}
        placeholder={placeholder}
        readOnly={readOnly}
      >
        <Base />
        <Placeholder text={placeholder} className={styles.placeholder} />
        <Embeds />
      </Editor>
      <PortalRenderer />
      {menuBar && <MenuBar />}
      {floatingMenu && <FloatingMenu />}
      {debug && <Debugger state={debugState} />}
    </EditorManager>
  );
};

const Debugger = ({ state }: { state: EditorState }): React.ReactElement => {
  return <pre>{JSON.stringify(state, null, 2)}</pre>;
};

export default PressEditor;

export type PressEditorProps = {
  /**
   * Display the editor's doc state below editor
   */
  debug?: boolean;
  /**
   * Turn on or off the bottom formatting menu
   */
  bottomMenu?: boolean;
  /**
   * Turn on or off the floating formatting menu
   */
  floatingMenu?: boolean;
  /**
   * Add custom classname to root editor <div>
   */
  className?: string;
  /**
   * Callback function that runs when editor state changes
   */
  onChange?: (state: EditorState) => void;
  /**
   * Callback function that runs when editor is mounted and ready
   */
  onMount?: (state: EditorState) => void;
  /**
   * Default value of the editor when it's mounted
   */
  defaultValue?: Record<string, unknown>;
  /**
   * Puts the editor in readOnly mode
   */
  readOnly?: boolean;
  /**
   * Displays a format menu with clickable buttons on the editor
   */
  menuBar?: boolean;
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * Callbacks to be passed to the editor for things like uploading images and scraping links
   */
  callbacks?: Callbacks;
};
