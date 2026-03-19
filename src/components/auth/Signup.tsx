"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

import { Button, InputWithLabel, Typography } from "@/components";
import { authService } from "@/services/auth-service";

import { AuthWrapper } from "./AuthWrapper";

const SignUp = () => {
  const locale = "en";
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (key: string, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSignUp = async () => {
    try {
      setLoading(true);
      await authService.register({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      });
      toast.success("Registration successful!");
      router.push(`/${locale}/dashboard`);
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "An error occurred during registration";
      toast.error(message);
      console.error("Error during registration:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthWrapper
      image="/assets/gifs/Signup.gif"
      imageAlt="Sign up illustration"
    >
      <Typography variant="h2">Create an account</Typography>
      <Typography variant="p" className="mt-1 mb-6 text-gray-500">
        Please fill in the form below to create an account.
      </Typography>

      <div className="flex gap-x-3">
        <div className="flex-1">
          <InputWithLabel
            label="First Name"
            type="text"
            placeholder="First name"
            onChange={(e) => handleChange("firstName", e.target.value)}
            value={data.firstName}
          />
        </div>
        <div className="flex-1">
          <InputWithLabel
            label="Last Name"
            type="text"
            placeholder="Last name"
            onChange={(e) => handleChange("lastName", e.target.value)}
            value={data.lastName}
          />
        </div>
      </div>

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
        text="Sign Up"
        onClick={handleSignUp}
        variant="my-4"
      />

      <div className="flex items-center justify-end gap-x-1">
        <Typography variant="caption">Already have an account?</Typography>
        <Button
          text="Sign In"
          onClick={() => router.push(`/${locale}/sign-in`)}
          variant="underline bg-transparent hover:bg-transparent !w-fit !px-0 !py-1 !text-secondary text-xs"
        />
      </div>
    </AuthWrapper>
  );
};

export { SignUp };
