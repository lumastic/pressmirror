import React, { useMemo } from "react";
import { Editor } from "../../core";
import { ReactEditorContext } from "../../core/context/useEditorContext";
import { createDefaultProviders } from "../../core/providers";
import { Base } from "../../extensions";

type PressEditorProps = {
  debug?: boolean;
  bottomMenu?: boolean;
  floatingMenu?: boolean;
  className?: string;
};

const PressEditor = ({
  debug = false,
  className = ""
}: PressEditorProps): React.ReactElement => {
  const providers = useMemo(() => createDefaultProviders(), []);
  return (
    <ReactEditorContext.Provider value={providers}>
      <Editor>
        <Base />
      </Editor>
    </ReactEditorContext.Provider>
  );
};

export default PressEditor;
