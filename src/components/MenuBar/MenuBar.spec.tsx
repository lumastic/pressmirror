import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import { MenuBar } from ".";

describe("MenuBar tests", () => {
  test("Can mount", () => {
    render(<MenuBar />);
    expect(screen.queryByTestId("pressmirror-menubar")).toBeTruthy();
  });
});
