import React, { ChangeEvent, useRef } from "react";
import { toggleLink } from "../../commands/toggleLink";
import toggleMarkCommand from "../../commands/toggleMarkCommand";
import { FormatButton } from "../FormatButton";
import { Divider, Tooltip } from "lumastic-ui";
import { PaperClip, LinkIcon, Image } from "lumastic-ui/icons";
import style from "./MenuBar.scss";
import btnStyle from "../FormatButton/FormatButton.scss";

type MenuBarProps = {
  attachImage?: (e: ChangeEvent<HTMLInputElement>) => void;
  attachFile?: (e: ChangeEvent<HTMLInputElement>) => void;
};

const MenuBar = ({
  attachImage,
  attachFile
}: MenuBarProps): React.ReactElement => {
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const fileHandler = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const pictureHandler = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };
  return (
    <div className={style.menubar} data-testid={"pressmirror-menubar"}>
      <Divider />
      <div className={style.buttons}>
        <div className={style.leftbtns}>
          <Tooltip label="Bold">
            <FormatButton command={toggleMarkCommand("strong")} mark={"strong"}>
              B
            </FormatButton>
          </Tooltip>
          <Tooltip label="Underline">
            <FormatButton
              command={toggleMarkCommand("underline")}
              mark="underline"
            >
              <u>U</u>
            </FormatButton>
          </Tooltip>
          <Tooltip label="Italic">
            <FormatButton command={toggleMarkCommand("italic")} mark="italic">
              <em>I</em>
            </FormatButton>
          </Tooltip>
          <Tooltip label="Link">
            <FormatButton command={toggleLink} mark="link">
              <LinkIcon />
            </FormatButton>
          </Tooltip>
        </div>
        <div className={style.rightbtns}>
          <input
            hidden
            type="file"
            ref={imageInputRef}
            onChange={attachImage}
          />
          <Tooltip label="Attach Picture">
            <button className={btnStyle.formatbutton} onClick={pictureHandler}>
              <Image />
            </button>
          </Tooltip>
          <input hidden type="file" ref={fileInputRef} onChange={attachFile} />
          <Tooltip label="Attach File">
            <button className={btnStyle.formatbutton} onClick={fileHandler}>
              <PaperClip />
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default MenuBar;
