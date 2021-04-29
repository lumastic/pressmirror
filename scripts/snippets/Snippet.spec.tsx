import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import { COMPONENT_NAME } from ".";

describe("COMPONENT_NAME tests", () => {
  test("Can mount", () => {
    render(<COMPONENT_NAME>Test</COMPONENT_NAME>);
    expect(screen.queryByTestId("COMPONENT_LOWER")).toBeTruthy();
  });
});
