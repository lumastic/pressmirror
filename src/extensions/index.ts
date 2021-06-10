import { BaseExtension } from "./base";
import { createReactExtension } from "./createReactExtension";
import { FocusExtention } from "./focus";
import { EmbedExtension } from "./embeds";
import { PlaceholderExtension } from "./placeholder";
import { SuggestionExtension } from "./suggestion";

export const Base = createReactExtension<Record<string, unknown>>(
  BaseExtension
);
export const Focus = createReactExtension<Record<string, unknown>>(
  FocusExtention
);
export const Placeholder = createReactExtension<Record<string, unknown>>(
  PlaceholderExtension
);

export const Embeds = createReactExtension<Record<string, unknown>>(
  EmbedExtension
);

export const Suggestions = createReactExtension<Record<string, unknown>>(
  SuggestionExtension
);
