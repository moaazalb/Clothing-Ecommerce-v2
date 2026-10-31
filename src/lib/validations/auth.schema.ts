
import { z } from "zod";

export const IMAGE_URL_MAX_LENGTH = 2048;
export const IMAGE_URL_ERROR_MESSAGE =
  "Image must be a valid http(s) URL (max 2048 characters).";

export const USERNAME_MIN_LENGTH = 4;
export const USERNAME_MAX_LENGTH = 10;
export const PASSWORD_MIN_LENGTH = 4;
export const PASSWORD_MAX_LENGTH = 10;

export const USERNAME_ERROR_MESSAGE =
  "Username must be 4-10 letters (A-Z only).";

export const PASSWORD_ERROR_MESSAGE =
  "Password must be 4-10 characters with at least one letter, one number and one of !@#$%^&*.";

const USERNAME_REGEX = /^[A-Za-z]{4,10}$/;

const PASSWORD_REGEX =
  /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{4,10}$/;

export const usernameSchema = z
  .string()
  .regex(USERNAME_REGEX, USERNAME_ERROR_MESSAGE);

export const passwordSchema = z
  .string()
  .regex(PASSWORD_REGEX, PASSWORD_ERROR_MESSAGE);

/**
 * Checks that a value is empty or an http(s) URL. Blocks schemes such as javascript: and data:.
 *
 * @param {string} value - The text to check.
 * @returns {boolean} True when the value is empty or a valid http(s) URL.
 */
function isHttpUrl(value: string): boolean {
  if (value === "") return true;

  try {
    const { protocol } = new URL(value);
    return protocol === "http:" || protocol === "https:";
  } catch {
    return false;
  }
}

/** The image is optional: an empty string is valid, anything else must be an http(s) URL. */
export const imageUrlSchema = z
  .string()
  .trim()
  .max(IMAGE_URL_MAX_LENGTH, IMAGE_URL_ERROR_MESSAGE)
  .refine(isHttpUrl, IMAGE_URL_ERROR_MESSAGE);

/** The user kept in state and sessionStorage. It never contains the password. */
export const userSchema = z.object({
  name: z.string(),
  image: z.string(),
  authUser: z.boolean(),
});

/** What the login form sends to the slice. */
export const loginPayloadSchema = z.object({
  name: usernameSchema,
  password: passwordSchema,
});

/** A locally registered account. */
export const registeredUserSchema = z.object({
  name: usernameSchema,
  password: passwordSchema,
  image: imageUrlSchema,
});

export const registeredUsersSchema = z.array(registeredUserSchema);

/** Data required to create a user session after registration. */
export const signupPayloadSchema = registeredUserSchema;

/**
 * Validates the signup form and ensures that both passwords match.
 */
export const signupFormSchema = z
  .object({
    name: usernameSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
    image: imageUrlSchema,
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

/** Everything the login form validates before it dispatches `login`. */
export const loginFormSchema = z.object({
  name: usernameSchema,
  password: passwordSchema,
  image: imageUrlSchema,
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;
export type LoginPayload = z.infer<typeof loginPayloadSchema>;
export type SignupFormValues = z.infer<typeof signupFormSchema>;
export type SignupPayload = z.infer<typeof signupPayloadSchema>;
export type RegisteredUser = z.infer<typeof registeredUserSchema>;
export type User = z.infer<typeof userSchema>;
export type RegisteredUsers = z.infer<typeof registeredUsersSchema>;
