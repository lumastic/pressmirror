import React from "react";
import { toggleLink } from "../../commands/toggleLink";
import toggleMarkCommand from "../../commands/toggleMarkCommand";
import { FormatButton } from "../FormatButton";
import { Divider } from "lumastic-ui";
import style from "./MenuBar.scss";

type MenuBarProps = {
  attachImage?: (images: FileList) => any;
  attachFile?: (files: FileList) => any;
};

const MenuBar = ({
  attachImage,
  attachFile
}: MenuBarProps): React.ReactElement => {
  return (
    <div className={style.menubar} data-testid={"pressmirror-menubar"}>
      <Divider />
      <div className={style.buttons}>
        <div className={style.leftbtns}>
          <FormatButton command={toggleMarkCommand("strong")} mark={"strong"}>
            B
          </FormatButton>
          <FormatButton
            command={toggleMarkCommand("underline")}
            mark="underline"
          >
            <u>U</u>
          </FormatButton>
          <FormatButton command={toggleMarkCommand("italic")} mark="italic">
            <em>I</em>
          </FormatButton>
          <FormatButton command={toggleLink} mark="link">
            L
          </FormatButton>
        </div>
      </div>
    </div>
  );
};

export default MenuBar;
