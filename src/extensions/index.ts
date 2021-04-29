import { BaseExtension } from "./base";
import { createReactExtension } from "./createReactExtension";

export const Base = createReactExtension<Record<string, unknown>>(
  BaseExtension
);
