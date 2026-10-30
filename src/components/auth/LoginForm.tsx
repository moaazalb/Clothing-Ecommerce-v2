// components/auth/LoginForm.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { ReactElement } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { FormField } from "@/components/forms/FormField";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { login } from "@/store/slices/authSlice/AuthSlice";
import { loginFormSchema } from "@/lib/validations/auth.schema";
import type { LoginFormValues } from "@/lib/validations/auth.schema";

const DEFAULT_VALUES: LoginFormValues = { name: "", password: "", image: "" };

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
    <div className="grid min-h-screen place-items-center px-4 py-8">
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-labelledby="login-title"
      className="w-full max-w-sm"
    >
    <Card className="w-full">
      <CardHeader className="mx-4 mt-4 mb-4 grid h-28 place-items-center rounded-xl bg-gradient-to-tr from-gray-600 to-gray-400 text-white shadow-lg">
        <h1 id="login-title" className="text-3xl font-semibold text-center">
          Sign In
        </h1>
      </CardHeader>
          <CardContent className="flex flex-col gap-4">
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
          </CardContent>
          <CardFooter className="flex-col pt-0">
            <Button
              type="submit"
              className="w-full bg-gradient-to-tr from-gray-600 to-gray-400 text-white"
              disabled={!isValid || isSubmitting}
            >
              Sign In
            </Button>
            <p className="mt-6 text-sm">Image is Optional</p>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}