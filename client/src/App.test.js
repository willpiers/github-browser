import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders Github repos header", () => {
  const { getByText } = render(<App />);
  const header = getByText(/Github repos/i);
  expect(header).toBeInTheDocument();
});
