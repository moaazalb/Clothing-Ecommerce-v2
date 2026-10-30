import reducer, { login, logout } from "./AuthSlice";
import type { LoginPayload } from "@/src/lib/validations/auth.schema";

const VALID_LOGIN: LoginPayload = { name: "John", password: "abc1!", image: "/john.jpg" };
const GUEST = { name: "", image: "", authUser: false };

const initAction = { type: "@@INIT" };
const readStored = (key: string): unknown =>
  JSON.parse(window.sessionStorage.getItem(key) ?? "null");

describe("authSlice", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.sessionStorage.clear();
  });

  describe("initial state", () => {
    it("starts as a guest when nothing is stored", () => {
      expect(reducer(undefined, initAction).user).toEqual(GUEST);
    });

    it("restores a valid user from sessionStorage", async () => {
      const stored = { name: "John", image: "/john.jpg", authUser: true };
      window.sessionStorage.setItem("authUser", JSON.stringify(stored));
      jest.resetModules();
      const { default: freshReducer } = await import("./AuthSlice");
      expect(freshReducer(undefined, initAction).user).toEqual(stored);
    });

    it("drops the password from data saved by the old version", async () => {
      window.sessionStorage.setItem(
        "authUser",
        JSON.stringify({ name: "John", password: "abc1!", image: "", authUser: true })
      );
      jest.resetModules();
      const { default: freshReducer } = await import("./AuthSlice");
      expect(freshReducer(undefined, initAction).user).toEqual({
        name: "John",
        image: "",
        authUser: true,
      });
    });

    it("falls back to a guest when stored JSON is corrupt", async () => {
      window.sessionStorage.setItem("authUser", "{not json");
      jest.resetModules();
      const { default: freshReducer } = await import("./AuthSlice");
      expect(freshReducer(undefined, initAction).user).toEqual(GUEST);
    });

    it("falls back to a guest when stored data fails validation", async () => {
      window.sessionStorage.setItem("authUser", JSON.stringify({ name: 5 }));
      jest.resetModules();
      const { default: freshReducer } = await import("./AuthSlice");
      expect(freshReducer(undefined, initAction).user).toEqual(GUEST);
    });
  });

  describe("login with valid credentials", () => {
    it("sets the user as authenticated", () => {
      const state = reducer(undefined, login(VALID_LOGIN));
      expect(state.user).toEqual({ name: "John", image: "/john.jpg", authUser: true });
    });

    it("never keeps the password in state", () => {
      const state = reducer(undefined, login(VALID_LOGIN));
      expect(state.user).not.toHaveProperty("password");
    });

    it("persists the user without the password", () => {
      reducer(undefined, login(VALID_LOGIN));
      expect(readStored("authUser")).toEqual({
        name: "John",
        image: "/john.jpg",
        authUser: true,
      });
    });

    it("accepts the minimum and maximum lengths", () => {
      expect(
        reducer(undefined, login({ ...VALID_LOGIN, name: "Abcd", password: "ab1!" })).user.authUser
      ).toBe(true);
      expect(
        reducer(undefined, login({ ...VALID_LOGIN, name: "Abcdefghij", password: "abcdefgh1!" }))
          .user.authUser
      ).toBe(true);
    });

    it("does not mutate the payload", () => {
      const payload = { ...VALID_LOGIN };
      reducer(undefined, login(payload));
      expect(payload).toEqual(VALID_LOGIN);
    });
  });

  describe("login with invalid credentials", () => {
    it.each([
      ["too short", "Abc"],
      ["too long", "Abcdefghijk"],
      ["has a digit", "John1"],
      ["has a space", "Jo hn"],
      ["is empty", ""],
    ])("rejects a name that %s", (_label, name) => {
      const state = reducer(undefined, login({ ...VALID_LOGIN, name }));
      expect(state.user).toEqual(GUEST);
      expect(window.sessionStorage.getItem("authUser")).toBeNull();
    });

    it.each([
      ["too short", "a1!"],
      ["too long", "abcdefgh1!x"],
      ["has no digit", "abcde!"],
      ["has no letter", "12345!"],
      ["has no special character", "abcde1"],
      ["has a disallowed character", "abc1!-"],
      ["is empty", ""],
    ])("rejects a password that %s", (_label, password) => {
      const state = reducer(undefined, login({ ...VALID_LOGIN, password }));
      expect(state.user).toEqual(GUEST);
      expect(window.sessionStorage.getItem("authUser")).toBeNull();
    });

    it("rejects a payload with missing fields", () => {
      const state = reducer(undefined, login({} as LoginPayload));
      expect(state.user).toEqual(GUEST);
    });

    it("rejects a missing name instead of validating the text 'undefined'", () => {
      const state = reducer(
        undefined,
        login({ password: "abc1!", image: "" } as LoginPayload)
      );
      expect(state.user.authUser).toBe(false);
    });

    it("logs out a logged-in user and removes the stored session", () => {
      const loggedIn = reducer(undefined, login(VALID_LOGIN));
      const state = reducer(loggedIn, login({ ...VALID_LOGIN, password: "bad" }));
      expect(state.user).toEqual(GUEST);
      expect(window.sessionStorage.getItem("authUser")).toBeNull();
    });
  });

  describe("logout", () => {
    it("resets the user to a guest", () => {
      const loggedIn = reducer(undefined, login(VALID_LOGIN));
      expect(reducer(loggedIn, logout()).user).toEqual(GUEST);
    });

    it("clears sessionStorage", () => {
      const loggedIn = reducer(undefined, login(VALID_LOGIN));
      window.sessionStorage.setItem("filteredData", "[]");
      reducer(loggedIn, logout());
      expect(window.sessionStorage.length).toBe(0);
    });

    it("works when already logged out", () => {
      expect(reducer(undefined, logout()).user).toEqual(GUEST);
    });

    it("does not mutate the previous state", () => {
      const loggedIn = reducer(undefined, login(VALID_LOGIN));
      const snapshot = JSON.stringify(loggedIn);
      reducer(loggedIn, logout());
      expect(JSON.stringify(loggedIn)).toBe(snapshot);
    });
  });
});