"use client";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

import { Button, InputWithLabel, Typography } from "@/components";
import { authService } from "@/services/auth-service";

const ResetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!token) {
      toast.error(
        "Invalid or missing reset token. Please request a new password reset link.",
      );
      return;
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await authService.resetPassword({ token, password });
      setSuccess(true);
      toast.success("Password reset successfully!");
    } catch (err: any) {
      toast.error(
        err?.message || "Failed to reset password. The link may have expired.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="flex min-h-screen min-w-screen items-center justify-center">
        <div className="p-8 text-center">
          <Typography
            text="Invalid Reset Link"
            variant="text-2xl font-semibold mb-4"
          />
          <p className="mb-6 text-gray-500">
            This password reset link is invalid or has already been used.
          </p>
          <Button
            text="Request New Link"
            onClick={() => router.push("/en/forget-password")}
            variant=""
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen min-w-screen flex-col items-center justify-center md:flex-row">
      <div className="flex w-full items-center justify-center md:w-1/2">
        <Image
          src="/assets/gifs/Resetpassword.gif"
          alt="Reset Password"
          width={400}
          height={400}
        />
      </div>
      <div className="w-full md:w-1/2">
        <div className="w-full rounded-lg p-4 shadow-lg md:max-w-xl md:p-12">
          {success ? (
            <>
              <Typography
                text="Password Reset!"
                variant="text-xl md:text-4xl font-semibold mb-1"
              />
              <Typography
                text="Your password has been reset successfully."
                variant="text-base md:text-lg mb-6 md:mb-12"
              />
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <svg
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <Button
                text="Back to Sign In"
                onClick={() => router.push("/en/sign-in")}
                variant="my-2 md:my-4"
              />
            </>
          ) : (
            <>
              <Typography
                text="Reset Password"
                variant="text-xl md:text-4xl font-semibold mb-1"
              />
              <Typography
                text="Please fill in the form below to set your new password."
                variant="text-base md:text-lg mb-6 md:mb-12"
              />
              <InputWithLabel
                label="New Password"
                type="password"
                placeholder="Enter your new password (min. 8 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                showEye
                disabled={loading}
              />
              <InputWithLabel
                label="Confirm Password"
                type="password"
                placeholder="Confirm your new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                showEye
                disabled={loading}
              />
              <Button
                text={loading ? "Resetting..." : "Reset Password"}
                onClick={handleSubmit}
                variant="my-2 md:my-4"
                isLoading={loading}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export { ResetPassword };
