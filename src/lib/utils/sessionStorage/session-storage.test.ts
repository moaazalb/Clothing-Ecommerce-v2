// lib/utils/sessionStorage.test.ts
/** @jest-environment jsdom */
import { z } from "zod";
import { clearSession, readSession, removeSession, writeSession } from "./session-storage";

const schema = z.object({ name: z.string() });

describe("sessionStorage helpers", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    window.sessionStorage.clear();
  });

  it("returns null when the key is missing", () => {
    expect(readSession("k", schema)).toBeNull();
  });

  it("returns the value when it is valid", () => {
    window.sessionStorage.setItem("k", JSON.stringify({ name: "a" }));
    expect(readSession("k", schema)).toEqual({ name: "a" });
  });

  it("returns null for corrupt JSON", () => {
    window.sessionStorage.setItem("k", "{oops");
    expect(readSession("k", schema)).toBeNull();
  });

  it("returns null when the value fails the schema", () => {
    window.sessionStorage.setItem("k", JSON.stringify({ name: 5 }));
    expect(readSession("k", schema)).toBeNull();
  });

  it("writes JSON to storage", () => {
    writeSession("k", { name: "a" });
    expect(window.sessionStorage.getItem("k")).toBe('{"name":"a"}');
  });

  it("does not throw when storage is full", () => {
    jest.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("QuotaExceededError");
    });
    expect(() => writeSession("k", { name: "a" })).not.toThrow();
  });

  it("removes only the requested key", () => {
    window.sessionStorage.setItem("a", "1");
    window.sessionStorage.setItem("b", "2");
    removeSession("a");
    expect(window.sessionStorage.getItem("a")).toBeNull();
    expect(window.sessionStorage.getItem("b")).toBe("2");
  });

  it("does not throw when removing a missing key", () => {
    expect(() => removeSession("missing")).not.toThrow();
  });

  it("does not throw when removeItem fails", () => {
    jest.spyOn(Storage.prototype, "removeItem").mockImplementation(() => {
      throw new Error("SecurityError");
    });
    expect(() => removeSession("k")).not.toThrow();
  });

  it("clears all keys", () => {
    window.sessionStorage.setItem("a", "1");
    window.sessionStorage.setItem("b", "2");
    clearSession();
    expect(window.sessionStorage.length).toBe(0);
  });

  it("does not throw when clear fails", () => {
    jest.spyOn(Storage.prototype, "clear").mockImplementation(() => {
      throw new Error("SecurityError");
    });
    expect(() => clearSession()).not.toThrow();
  });
});