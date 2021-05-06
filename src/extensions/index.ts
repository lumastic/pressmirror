import { BaseExtension } from "./base";
import { createReactExtension } from "./createReactExtension";
import { FocusExtention } from "./focus";
import { LinkExtension } from "./links";
import { PlaceholderExtension } from "./placeholder";

export const Base = createReactExtension<Record<string, unknown>>(
  BaseExtension
);
export const Focus = createReactExtension<Record<string, unknown>>(
  FocusExtention
);
export const Placeholder = createReactExtension<Record<string, unknown>>(
  PlaceholderExtension
);

export const Links = createReactExtension<Record<string, unknown>>(
  LinkExtension
);
