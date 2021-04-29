import React from "react";
import style from "./COMPONENT_NAME.scss";

type COMPONENT_NAMEProps = {
  children: React.ReactNode;
};

const COMPONENT_NAME = ({
  children
}: COMPONENT_NAMEProps): React.ReactElement => {
  return (
    <div className={style.COMPONENT_LOWER} data-testid={"COMPONENT_LOWER"}>
      {children}
    </div>
  );
};

export default COMPONENT_NAME;
