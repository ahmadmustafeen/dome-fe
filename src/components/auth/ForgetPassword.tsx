"use client";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";

import { Button, InputWithLabel, Typography } from "@/components";
import { authService } from "@/services/auth-service";

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
    <div className="flex min-h-screen min-w-screen flex-col items-center justify-center md:flex-row">
      <div className="flex w-full items-center justify-center md:w-1/2">
        <Image
          src="/assets/gifs/Forgotpassword.gif"
          alt="Forgot Password"
          width={400}
          height={400}
        />
      </div>
      <div className="w-full md:w-1/2">
        <div className="border-0.5 w-full rounded-lg p-4 shadow-lg md:max-w-xl md:p-12">
          {submitted ? (
            <>
              <Typography
                text="Check Your Email"
                variant="text-xl md:text-4xl font-semibold mb-1"
              />
              <Typography
                text="If that email address is in our database, we will send you an email to reset your password."
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
              <p className="text-center text-sm text-gray-500">
                Didn&apos;t receive the email? Check your spam folder or
                <br />
                <button
                  onClick={() => setSubmitted(false)}
                  className="font-medium text-primary hover:underline"
                >
                  try again
                </button>
                .
              </p>
            </>
          ) : (
            <>
              <Typography
                text="Forgot Password?"
                variant="text-xl md:text-4xl font-semibold mb-1"
              />
              <Typography
                text="Enter your registered email and we'll send you a password reset link."
                variant="text-base md:text-lg mb-6 md:mb-12"
              />
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

export { ForgetPassword };
