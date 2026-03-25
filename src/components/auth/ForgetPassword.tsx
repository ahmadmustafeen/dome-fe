"use client";

import { useState } from "react";
import { toast } from "react-toastify";

import { Button, InputWithLabel, Typography } from "@/components";
import { authService } from "@/services/auth-service";

import { AuthWrapper } from "./AuthWrapper";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setLoading(true);
    try {
      await authService.forgotPassword({ email: email.trim() });
      setSubmitted(true);
    } catch {
      // Always show success to prevent email enumeration
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthWrapper
      image="/assets/gifs/Forgotpassword.gif"
      imageAlt="Forgot password illustration"
    >
      {submitted ? (
        <>
          <Typography variant="h2">Check Your Email</Typography>
          <Typography variant="p" className="mt-1 mb-6 text-gray-500">
            If that email address is in our database, we will send you an email
            to reset your password.
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

          <Typography
            variant="caption"
            className="block text-center text-gray-500"
          >
            Didn&apos;t receive the email? Check your spam folder or{" "}
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="font-medium text-primary hover:underline"
            >
              try again
            </button>
            .
          </Typography>
        </>
      ) : (
        <>
          <Typography variant="h2">Forgot Password?</Typography>
          <Typography variant="p" className="mt-1 mb-6 text-gray-500">
            Enter your registered email and we&apos;ll send you a password reset
            link.
          </Typography>

          <InputWithLabel
            label="Email"
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />

          <Button
            text={loading ? "Sending..." : "Send Reset Link"}
            onClick={handleSubmit}
            variant="my-4"
            isLoading={loading}
          />
        </>
      )}
    </AuthWrapper>
  );
};

export { ForgetPassword };
