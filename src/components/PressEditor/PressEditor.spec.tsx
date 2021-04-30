import "@testing-library/jest-dom";
import React from "react";
import { render } from "@testing-library/react";
import { PressEditor } from ".";

describe("PressEditor tests", () => {
  test("Can mount", () => {
    const { container } = render(<PressEditor />);
    expect(container.getElementsByClassName("ProseMirror").length).toBeTruthy();
  });
  test("See placeholder", () => {
    const { container } = render(<PressEditor />);
    expect(
      container.querySelectorAll("[data-placeholder]").length
    ).toBeTruthy();
  });
});
