import React from "react";
import style from "./PressRenderer.scss";

type PressRendererProps = {
  children: React.ReactNode;
};

const PressRenderer = ({
  children
}: PressRendererProps): React.ReactElement => {
  return (
    <div className={style.pressrenderer} data-testid={"pressrenderer"}>
      {children}
    </div>
  );
};

export default PressRenderer;
