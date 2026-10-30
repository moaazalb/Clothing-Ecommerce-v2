// app/login/page.test.tsx
/** @jest-environment jsdom */
import "@testing-library/jest-dom";
import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import authReducer from "@/src/store/slices/authSlice/AuthSlice";
import LoginPage, { metadata } from "./page";

describe("LoginPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the login form", () => {
    const store = configureStore({ reducer: { auth: authReducer } });
    render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );
    expect(screen.getByRole("heading", { name: "Sign In" })).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
  });

  it("sets the page title", () => {
    expect(metadata.title).toBe("Sign In");
  });
});