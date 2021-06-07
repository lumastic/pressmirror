import React, { useEffect, useRef } from "react";
import { toggleLink } from "../../commands/toggleLink";
import toggleMarkCommand from "../../commands/toggleMarkCommand";
import { useProviderContext } from "../../core/context/useEditorContext";
import { FormatButton } from "../FormatButton";
import style from "./FloatingMenu.scss";

type FloatingMenuProps = {
  children?: React.ReactNode;
};

const FloatingMenu = ({ children }: FloatingMenuProps): React.ReactElement => {
  const { viewProvider } = useProviderContext();
  const menuRef = useRef();
  useEffect(() => {
    function displayMenu() {
      const view = viewProvider.editorView;
      const state = view.state;
      if (!menuRef.current || !state) return;
      console.log("Henlo");
      const { from, to } = state.selection;
      const menu = menuRef.current as HTMLElement;
      if (
        view.hasFocus() &&
        view.state.selection.$anchor !== view.state.selection.$head
      ) {
        try {
          const start = view.coordsAtPos(from);
          const end = view.coordsAtPos(to);
          const box = menu.getBoundingClientRect();
          const offsetParentBox = menu.offsetParent.getBoundingClientRect();
          let left =
            (start.left + end.left) / 2 - box.width / 2 - offsetParentBox.left;
          if (left < 5) {
            left = 5;
          }
          menu.style.left = left + "px";
          menu.style.top =
            start.top - offsetParentBox.top - box.height - 7 + "px";
          menu.style.opacity = "1";
        } catch {
          console.error("FloatingMenu couldn't calculate it's position");
        }
      } else {
        menu.style.opacity = "0";
      }
    }
    console.log("Hello");
    displayMenu();
  }, [viewProvider.editorView.state]);
  return (
    <div
      className={style.floatingmenu}
      data-testid={"floatingmenu"}
      ref={menuRef}
    >
      <FormatButton command={toggleMarkCommand("strong")} mark={"strong"}>
        B
      </FormatButton>
      <FormatButton command={toggleMarkCommand("underline")} mark="underline">
        <u>U</u>
      </FormatButton>
      <FormatButton command={toggleMarkCommand("italic")} mark="italic">
        <em>I</em>
      </FormatButton>
      <FormatButton command={toggleLink} mark="link">
        L
      </FormatButton>
    </div>
  );
};

export default FloatingMenu;
