
"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ReactElement } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { signup } from "@/store/slices/authSlice/AuthSlice";
import {
  signupFormSchema,
  type SignupFormValues,
} from "@/lib/validations/auth.schema";
import { useEffect } from "react";
import type { AuthRootState } from "@/types/auth";
import { resetAuthStatus } from "@/store/slices/authSlice/AuthSlice";
import {
  showError,
  showSuccess,
} from "@/lib/utils/alerts/alerts";

const INPUT_CLASS =
  "w-full rounded-lg border border-[#E8D8C3] bg-[#F8F4ED] px-4 py-3 text-sm text-[#4B3621] outline-none transition-all placeholder:text-[#806B56]/60 hover:border-[#D6B58A] focus:border-[#A87945] focus:ring-2 focus:ring-[#A87945]/20";

interface SignupFieldProps {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  registration: ReturnType<
    ReturnType<typeof useForm<SignupFormValues>>["register"]
  >;
  error?: string;
}

/**
 * Reusable labelled signup input with validation feedback.
 *
 * @param {SignupFieldProps} props - The input configuration.
 * @returns {JSX.Element} The signup input.
 */
function SignupField({
  id,
  label,
  type = "text",
  placeholder,
  registration,
  error,
}: SignupFieldProps): ReactElement {
  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-semibold text-[#4B3621]"
      >
        {label}
      </label>

      <input
        id={id}
        type={type}
        placeholder={placeholder}
        autoComplete={
          type === "password"
            ? id === "confirmPassword"
              ? "new-password"
              : "new-password"
            : id === "name"
              ? "username"
              : "url"
        }
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${INPUT_CLASS} ${
          error ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""
        }`}
        {...registration}
      />

      {error ? (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-1.5 text-sm font-medium text-red-600"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

/**
 * Registration form with username, password, confirmation and optional image URL.
 *
 * @returns {JSX.Element} The signup form.
 */
export function SignupForm(): ReactElement {
  const dispatch = useDispatch();
  const router = useRouter();
  const authStatus = useSelector(
  (state: AuthRootState) => state.user.authStatus
);

useEffect(() => {
  if (authStatus === "signup_success") {
    showSuccess(
      "Account Created!",
      "Your account has been created successfully."
    ).then(() => router.replace("/"));

    dispatch(resetAuthStatus());
  }

  if (authStatus === "username_exists") {
    showError(
      "Username Already Exists",
      "This username is already registered. Please choose another one."
    );

    dispatch(resetAuthStatus());
  }
}, [authStatus, dispatch, router]);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      name: "",
      password: "",
      confirmPassword: "",
      image: "",
    },
    mode: "onChange",
  });

/**
 * Registers the user and creates a local authentication session.
 *
 * @param {SignupFormValues} values - The validated signup form values.
 * @returns {void}
 */
const onSubmit = (values: SignupFormValues): void => {
  dispatch(
    signup({
      name: values.name,
      password: values.password,
      image: values.image,
    })
  );
};

  return (
    <section className="flex min-h-[75vh] w-full items-center justify-center bg-[#F8F4ED] px-4 py-10 sm:px-6 sm:py-14">
      <div className="w-full max-w-lg rounded-2xl border border-[#E8D8C3] bg-white p-5 shadow-lg shadow-[#4B3621]/5 sm:p-8 lg:p-10">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-[#4B3621] sm:text-3xl">
            Create Account
          </h1>

          <p className="mt-2 text-sm text-[#806B56] sm:text-base">
            Create your account and start shopping with us.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col gap-5"
        >
          <SignupField
            id="name"
            label="Username"
            placeholder="Enter your username"
            registration={register("name")}
            error={errors.name?.message}
          />

          <SignupField
            id="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            registration={register("password")}
            error={errors.password?.message}
          />

          <SignupField
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            registration={register("confirmPassword")}
            error={errors.confirmPassword?.message}
          />

          <SignupField
            id="image"
            label="Profile Image URL (Optional)"
            type="url"
            placeholder="https://example.com/image.jpg"
            registration={register("image")}
            error={errors.image?.message}
          />

          <p className="text-xs leading-5 text-[#806B56]">
            Username: 4–10 English letters. Password: 4–10 characters,
            including a letter, a number and a special character (!@#$%^&*).
          </p>

          <Button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="mt-2 h-12 w-full border border-[#A87945] bg-[#A87945] text-base font-semibold text-white shadow-sm transition-all duration-300 hover:border-[#4B3621] hover:bg-[#4B3621] disabled:cursor-not-allowed disabled:border-[#D6B58A] disabled:bg-[#E8D8C3] disabled:text-[#806B56]"
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </Button>
        </form>

        <div className="mt-7 border-t border-[#E8D8C3] pt-6 text-center">
          <p className="text-sm text-[#806B56]">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-[#A87945] transition-colors hover:text-[#4B3621] hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
