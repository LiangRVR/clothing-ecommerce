import {render, screen } from "@testing-library/react";
import CustomButton from "../custom-button.component";


describe("customButton test", () => {
  it("should render base button when nothing is passed", () => {
    render(<CustomButton>Test</CustomButton>);

    expect(screen.getByRole("button")).toHaveStyle("background-color: black");
    expect(screen.getByRole("button")).not.toBeDisabled();
    expect(screen.getByRole("button").textContent).toEqual("Test");
  });

  it("should be disabled if disabled is true", () => {
    render(<CustomButton disabled>Test</CustomButton>);

    expect(screen.getByRole("button")).toBeDisabled();
    expect(screen.getByRole("button")).toHaveStyle("opacity: 0.5");
  });

  it("should render google button when passed isGoogleSignIn props", () => {
    render(<CustomButton isGoogleSignIn>Test</CustomButton>);

    expect(screen.getByRole("button")).toHaveStyle("background-color: #4285f4");
  });

  it("should render inverted button when passed inverted props", () => {
    render(<CustomButton inverted>Test</CustomButton>);

    expect(screen.getByRole("button")).toHaveStyle("background-color: white");
  });
});
