"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

import { Button, InputWithLabel, Typography } from "@/components";
import { authService } from "@/services/auth-service";
import { isValidEmail } from "@/utils/Helpers";

import { AuthWrapper } from "./AuthWrapper";

const SignIn = () => {
  const locale = "en";
  const router = useRouter();

  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (key: string, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const onSignIn = async () => {
    if (!data.email || !data.password) {
      toast.error("Please fill in all fields");
      return;
    }
    if (!isValidEmail(data.email)) {
      toast.error("Please enter a valid email");
      return;
    }
    try {
      setLoading(true);
      await authService.login({ email: data.email, password: data.password });
      toast.success("Login successful!");
      router.push(`/${locale}/dashboard`);
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "An error occurred during login";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthWrapper image="/assets/gifs/Login.gif" imageAlt="Sign in illustration">
      <Typography variant="h2">Welcome back!</Typography>
      <Typography variant="p" className="mt-1 mb-6 text-gray-500">
        Please sign in to your account.
      </Typography>

      <InputWithLabel
        label="Email"
        type="email"
        placeholder="Enter your email"
        onChange={(e) => handleChange("email", e.target.value)}
        value={data.email}
      />
      <InputWithLabel
        label="Password"
        type="password"
        showEye
        placeholder="Enter your password"
        onChange={(e) => handleChange("password", e.target.value)}
        value={data.password}
      />

      <Button
        isLoading={loading}
        text="Sign In"
        onClick={onSignIn}
        variant="my-4"
      />

      <div className="flex justify-between gap-4">
        <div>
          <Typography variant="caption">Forgot your password?</Typography>
          <Button
            text="Reset Password"
            onClick={() => router.push(`/${locale}/forget-password`)}
            variant="underline bg-transparent hover:bg-transparent !w-fit !px-0 !py-1 !text-secondary text-xs"
          />
        </div>
        <div className="text-right">
          <Typography variant="caption">Don&apos;t have an account?</Typography>
          <div className="flex justify-end">
            <Button
              text="Sign Up"
              onClick={() => router.push(`/${locale}/sign-up`)}
              variant="underline bg-transparent hover:bg-transparent !w-fit !px-0 !py-1 !text-secondary text-xs"
            />
          </div>
        </div>
      </div>
    </AuthWrapper>
  );
};

export { SignIn };
