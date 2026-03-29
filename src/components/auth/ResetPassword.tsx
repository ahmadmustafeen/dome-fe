"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

import { Button, InputWithLabel, Typography } from "@/components";
import { AUTH_ROUTES } from "@/constants/routes";
import { authService } from "@/services/auth-service";

import { AuthWrapper } from "./AuthWrapper";

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
      <AuthWrapper
        image="/assets/gifs/Resetpassword.gif"
        imageAlt="Reset password illustration"
      >
        <Typography variant="h2">Invalid Reset Link</Typography>
        <Typography variant="p" className="mt-1 mb-6 text-gray-500">
          This password reset link is invalid or has already been used.
        </Typography>
        <Button
          text="Request New Link"
          onClick={() => router.push(AUTH_ROUTES.FORGET_PASSWORD)}
          variant="my-4"
        />
      </AuthWrapper>
    );
  }

  return (
    <AuthWrapper
      image="/assets/gifs/Resetpassword.gif"
      imageAlt="Reset password illustration"
    >
      {success ? (
        <>
          <Typography variant="h2">Password Reset!</Typography>
          <Typography variant="p" className="mt-1 mb-6 text-gray-500">
            Your password has been reset successfully.
          </Typography>

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
            onClick={() => router.push(AUTH_ROUTES.SIGN_IN)}
            variant="my-4"
          />
        </>
      ) : (
        <>
          <Typography variant="h2">Reset Password</Typography>
          <Typography variant="p" className="mt-1 mb-6 text-gray-500">
            Please enter and confirm your new password below.
          </Typography>

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
            variant="my-4"
            isLoading={loading}
          />
        </>
      )}
    </AuthWrapper>
  );
};

export { ResetPassword };
