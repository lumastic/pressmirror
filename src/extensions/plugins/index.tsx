import { baseKeymap } from "prosemirror-commands";
import { history, redo, undo } from "prosemirror-history";
import { keymap } from "prosemirror-keymap";
import { schema } from "prosemirror-schema-basic";
import toggleMarkCommand from "../../commands/toggleMarkCommand";
import { focusPluginFactory } from "./focus";

const toggleBold = toggleMarkCommand(schema.marks.strong);
const toggleItalic = toggleMarkCommand(schema.marks.italic);

const plugins = [
  history(),
  keymap({
    ...baseKeymap,
    "Mod-z": undo,
    "Mod-y": redo,
    "Mod-Shift-z": redo,
    "Mod-b": toggleBold,
    "Mod-i": toggleItalic
  }),
  focusPluginFactory
];

export default plugins;
