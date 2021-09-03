import { fireEvent, render, screen } from "@testing-library/react";
import IconButton from "..";
import { Activity } from "react-feather";

test("renders icon-button successfully", async () => {
  render(
    <IconButton
      data-testid="icon-button"
      mode="delete"
      icon={<Activity />}
    />
  );
});

test("renders icon-button successfully when clicked", async () => {
  const onClick = jest.fn();
  render(
    <IconButton
      data-testid="icon-button"
      mode="delete"
      icon={<Activity />}
      onClick={onClick}
    />
  );
  fireEvent.click(screen.getByTestId("icon-button"));
  expect(onClick).toHaveBeenCalledTimes(1);
});
