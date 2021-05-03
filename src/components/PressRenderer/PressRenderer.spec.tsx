/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import { PressRenderer } from ".";

describe("PressRenderer tests", () => {
  test("Can mount", () => {
    render(<PressRenderer>Test</PressRenderer>);
    expect(screen.queryByTestId("pressrenderer")).toBeTruthy();
  });
});
