import { fireEvent, render, screen } from "@testing-library/react";
import Button from "..";

test("renders button successfully", async () => {
  render(<Button>Click me</Button>);
});

test("renders successfully when clicked", async () => {
  const onClick = jest.fn();
  render(<Button onClick={onClick}>Click me</Button>);
  fireEvent.click(screen.getByText("Click me"));
  expect(onClick).toHaveBeenCalledTimes(1);
});
