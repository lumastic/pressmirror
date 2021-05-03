/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import React from "react";
import { PressEditor } from "..";

describe("PressEditor", () => {
  test("should mount", () => {
    const { container } = render(<PressEditor />);
    expect(container.getElementsByClassName("ProseMirror").length).toBeTruthy();
  });
  test("should see placeholder", () => {
    const { container } = render(<PressEditor />);
    expect(
      container.querySelectorAll("[data-placeholder]").length
    ).toBeTruthy();
  });
});
