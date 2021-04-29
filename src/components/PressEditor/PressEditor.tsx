import { Node } from "prosemirror-model";
import { NodeView } from "prosemirror-view";
import React, { Dispatch, memo, useState } from "react";
import { createPortal } from "react-dom";
import useConstant from "use-constant";
import plugins from "../../extensions/plugins";
// import schema from "../../extensions/schema";
import { ProseMirror, useProseMirror } from "../ProseMirror";
import { Type } from "lumastic-ui";
import styles from "./PressEditor.scss";

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
  const [state, setState] = useProseMirror({
    // schema: schema,
    plugins
  });
  const isMounted = useIsMounted();
  const [nodeViewSpecs, setNodeViewSpecs] = useState([]);

  const nodeViews = useConstant(() => nodeView(isMounted, setNodeViewSpecs));
  // const { createPortal } = useNodeViewPortals();
  // const nodeViews = useConstant(() => createNodeViews(createPortal));

  const classNames = [
    className,
    styles.prosemirror,
    debug && styles.debug
  ].join(" ");
  return (
    <>
      <ProseMirror
        state={state}
        onChange={setState}
        className={classNames}
        nodeViews={nodeViews}
      />
      {debug && <pre>{JSON.stringify(state, null, 2)}</pre>}
      <RenderNodeViews nodeViewSpecs={nodeViewSpecs} />
    </>
  );
};

type NodeViewSpec = {
  key: string;
  type: string;
  el: HTMLElement;
  attrs: Record<string, any>;
};

// eslint-disable-next-line react/display-name
const RenderNodeViews = memo(
  ({
    nodeViewSpecs
  }: {
    nodeViewSpecs: NodeViewSpec[];
  }): React.ReactElement => {
    return (
      <>
        {nodeViewSpecs.map(({ el, key, type, attrs }) => {
          console.log(attrs);
          if (type === "paragraph") {
            return createPortal(<Type />, el, key);
          }
        })}
      </>
    );
  }
);

// const PressEditor = (props: PressEditorProps): React.ReactElement => {
//   return (
//     <NodeViewPortalsProvider>
//       <Editor {...props} />
//     </NodeViewPortalsProvider>
//   );
// };

const useIsMounted = () => {
  const [isMounted, setisMounted] = React.useState(false);
  React.useEffect(() => {
    setisMounted(true);
    return () => setisMounted(false);
  }, []);

  return isMounted;
};

function nodeView(
  isMounted: boolean,
  setSpecs: Dispatch<React.SetStateAction<any>>
): Record<string, (props: Node) => NodeView> {
  return {
    paragraph: buildNodeView
  };
  function buildNodeView({ attrs, type, isLeaf }: Node): NodeView {
    const el = document.createElement("div");
    let contentDOM = null;
    if (!isLeaf) {
      contentDOM = document.createElement("div");
      el.appendChild(contentDOM);
    }
    const key = attrs.id || attrs.key;
    const spec = {
      key: `${key}`,
      type: type.name,
      el,
      attrs
    };
    // Hack around https://github.com/facebook/react/issues/18178#issuecomment-595846312
    setTimeout(() => {
      setSpecs((specs) => [...specs, spec]);
    }, 0);
    return {
      dom: el,
      contentDOM,
      destroy
    };
    function destroy() {
      // Avoid memory leak warnings after unmount
      if (isMounted) {
        // Hack around https://github.com/facebook/react/issues/18178#issuecomment-595846312
        setTimeout(() => {
          setSpecs((specs) => {
            const next = [...specs];
            next.splice(
              specs.findIndex(({ el }) => el === spec.el),
              1
            );
            return next;
          });
        }, 0);
      }
    }
  }
}

export default PressEditor;
