"use client";

import type { InputHTMLAttributes, Ref } from "react";

import { cn } from "@/utils/Helpers";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  /** When false, omits default portal input styling. */
  useMopStyles?: boolean;
  ref?: Ref<HTMLInputElement | null>;
};

export const Input = ({ ref, className, useMopStyles = true, ...rest }: InputProps) => (
  <input
    ref={ref}
    className={cn(useMopStyles ? "mop-doc-input" : "", className)}
    {...rest}
  />
);

Input.displayName = "Input";
