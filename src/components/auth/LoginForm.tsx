"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { ReactElement } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { FormField } from "@/components/forms/FormField";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { login } from "@/store/slices/authSlice/AuthSlice";
import { loginFormSchema } from "@/lib/validations/auth.schema";
import type { LoginFormValues } from "@/lib/validations/auth.schema";

const DEFAULT_VALUES: LoginFormValues = {
  name: "",
  password: "",
  image: "",
};

/**
 * Sign-in form. Validates every field, then dispatches `login`; the submit button
 * stays disabled until the form is valid.
 *
 * @returns {JSX.Element} The login form.
 */
export function LoginForm(): ReactElement {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onChange",
  });

  /**
   * Sends the validated credentials to the auth slice.
   *
   * @param {LoginFormValues} values - The validated form values.
   * @returns {void}
   */
  const onSubmit = (values: LoginFormValues): void => {
    dispatch(login(values));
  };

  return (
    <main className="relative grid min-h-[calc(100vh-8rem)] place-items-center overflow-hidden bg-[#F8F4ED] px-4 py-12 sm:px-6">
      {/* Decorative background elements */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#E8D8C3]/50 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 -right-20 h-80 w-80 rounded-full bg-[#D6B58A]/25 blur-3xl"
      />

      <div className="relative w-full max-w-md">
        {/* Intro */}
        <div className="mb-8 text-center">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.3em] text-[#A87945]">
            Welcome Back
          </span>

          <h1 className="text-3xl font-bold tracking-tight text-[#4B3621] sm:text-4xl">
            Sign in to your account
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#806B56]">
            Welcome back! Enter your details to continue shopping.
          </p>
        </div>

        {/* Login card */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          aria-labelledby="login-title"
          className="w-full"
        >
          <Card className="overflow-hidden rounded-2xl border border-[#E8D8C3] bg-white shadow-[0_20px_60px_-25px_rgba(75,54,33,0.22)]">
            <CardHeader className="relative mx-4 mt-4 mb-5 overflow-hidden rounded-xl bg-[#A87945] px-6 py-8 text-center text-white sm:mx-5 sm:mt-5">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-8 -top-12 h-36 w-36 rounded-full border border-white/10"
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-16 -left-8 h-36 w-36 rounded-full border border-white/10"
              />

              <div className="relative">
                <span className="mb-2 block text-xs font-medium uppercase tracking-[0.25em] text-[#D6B58A]">
                  Your Style, Your Story
                </span>

                <h2
                  id="login-title"
                  className="text-3xl font-semibold tracking-wide"
                >
                  Sign In
                </h2>

                <p className="mt-2 text-sm text-[#E8D8C3]">
                  Let&apos;s get you back to your favorites.
                </p>
              </div>
            </CardHeader>

            <CardContent className="flex flex-col gap-5 px-5 sm:px-6">
              <FormField
                id="name"
                label="Name"
                autoComplete="username"
                registration={register("name")}
                error={errors.name?.message}
              />

              <FormField
                id="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                registration={register("password")}
                error={errors.password?.message}
              />

              <FormField
                id="image"
                label="Image URL address"
                autoComplete="url"
                registration={register("image")}
                error={errors.image?.message}
              />

              <p className="-mt-2 text-xs leading-5 text-[#806B56]">
                Your profile image is optional. You can leave this field empty.
              </p>
            </CardContent>

            <CardFooter className="flex-col px-5 pt-2 pb-7 sm:px-6">
              <Button
                type="submit"
                className="w-full rounded-lg bg-[#A87945] py-5 font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#8F6337] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A87945] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={!isValid || isSubmitting}
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
              </Button>

              <p className="mt-5 text-center text-xs leading-5 text-[#806B56]">
                By signing in, you can continue exploring our collection.
              </p>
            </CardFooter>
          </Card>
        </form>

        {/* Bottom accent */}
        <div className="mt-7 flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-[#D6B58A]" />
          <span className="text-xs font-medium tracking-widest text-[#A87945]">
            ELEGANCE IN EVERY DETAIL
          </span>
          <span className="h-px w-10 bg-[#D6B58A]" />
        </div>
      </div>
    </main>
  );
}