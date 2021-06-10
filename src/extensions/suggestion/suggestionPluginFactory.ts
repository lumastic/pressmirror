import { ResolvedPos } from "prosemirror-model";
import { Plugin, Transaction } from "prosemirror-state";
import { ProviderContextType } from "../../core/types";
import { suggestionPluginKey } from "./suggestionPluginKey";

export function suggestionPluginFactory(
  ctx: ProviderContextType,
  options: Record<string, unknown>
): Plugin {
  return new Plugin({
    key: suggestionPluginKey,
    state: {
      init(): SuggestionState {
        return {
          active: false
        };
      },
      apply(tr: Transaction): SuggestionState {
        if (tr.selection.from !== tr.selection.to) {
          return { active: false };
        }
        const match = getMatch(tr.selection.$from);
        if (match) {
          return match;
        } else {
          return { active: false };
        }
      }
    }
  });
}

export type SuggestionState = {
  active: boolean;
  type?: string;
  range?: {
    from: number;
    to: number;
  };
  text?: string;
};

export function getMatch($position: ResolvedPos): SuggestionState {
  // take current para text content upto cursor start.
  // this makes the regex simpler and parsing the matches easier.d
  const parastart = $position.before();
  const text = $position.doc.textBetween(parastart, $position.pos, "\n", "\0");

  // only one of the below matches will be true.
  const mentionMatch = text.match(suggestionRegex.mention);
  const tagMatch = text.match(suggestionRegex.tag);
  const emojiMatch = text.match(suggestionRegex.emoji);
  const blockMatch = text.match(suggestionRegex.block);

  const match = mentionMatch || tagMatch || emojiMatch || blockMatch;

  // set type of match
  let type;
  if (mentionMatch) {
    type = "mention";
  } else if (tagMatch) {
    type = "tag";
  } else if (emojiMatch) {
    type = "emoji";
  } else if (blockMatch) {
    type = "block";
  }

  // if match found, return match with useful information.
  if (match) {
    // adjust match.index to remove the matched extra space
    match.index = match[0].startsWith(" ") ? match.index + 1 : match.index;
    match[0] = match[0].startsWith(" ")
      ? match[0].substring(1, match[0].length)
      : match[0];

    // The absolute position of the match in the document
    const from = $position.start() + match.index;
    const to = from + match[0].length;

    const queryText = match[2];
    return {
      active: true,
      range: { from: from, to: to },
      text: queryText,
      type: type
    };
  }
  // else if no match don't return anything.
}

const suggestionRegex = {
  mention: new RegExp("(^|\\s)" + "@" + "([\\w-\\+]+\\s?[\\w-\\+]*)$"),
  tag: new RegExp("(^|\\s)" + "#" + "([\\w-]+)$"),
  emoji: new RegExp("(^|\\s)" + ":" + "([\\w-]+)$"),
  block: new RegExp("(^|\\s)" + "/" + "([^\\s]|[\\w-\\+]*)$")
};
