// test/LoginForm.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import LoginForm from "../app/Components/loginform";  // Update this path
import "@testing-library/jest-dom";
import { api } from "../app/utils/apiService";  // Update this path

jest.mock("@/utils/apiService", () => ({
  api: {
    login: jest.fn(),
  },
}));

describe("LoginForm Component", () => {
  it("renders input fields and a submit button", () => {
    render(<LoginForm onLogin={jest.fn()} />);

    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByText("Sign in")).toBeInTheDocument();
  });

  it("shows/hides password when eye icon is clicked", () => {
    render(<LoginForm onLogin={jest.fn()} />);

    const passwordInput = screen.getByPlaceholderText("Password");
    const eyeButton = screen.getByRole("button");

    expect(passwordInput).toHaveAttribute("type", "password");

    fireEvent.click(eyeButton);
    expect(passwordInput).toHaveAttribute("type", "text");

    fireEvent.click(eyeButton);
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  it("calls API login function on form submit", async () => {
    const mockLogin = jest.fn().mockResolvedValue({});
    (api.login as jest.Mock) = mockLogin;

    render(<LoginForm onLogin={jest.fn()} />);

    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "testUser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "testPassword" },
    });
    fireEvent.click(screen.getByText("Sign in"));

    expect(api.login).toHaveBeenCalledWith("testUser", "testPassword");
  });
});
