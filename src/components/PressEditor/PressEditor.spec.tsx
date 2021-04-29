import "@testing-library/jest-dom";
import React from "react";
import { render } from "@testing-library/react";
import { PressEditor } from ".";

describe("PressEditor tests", () => {
  test("Can mount", () => {
    const { container } = render(<PressEditor />);
    expect(container.getElementsByClassName("ProseMirror").length).toBeTruthy();
  });
  test("Can mount", () => {
    const { container } = render(<PressEditor />);
    expect(container.getElementsByClassName("ProseMirror").length).toBeTruthy();
  });
});
