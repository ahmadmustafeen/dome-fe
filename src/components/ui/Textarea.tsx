"use client";

import type { Ref, TextareaHTMLAttributes } from "react";

import { cn } from "@/utils/Helpers";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  useMopStyles?: boolean;
  ref?: Ref<HTMLTextAreaElement | null>;
};

export const Textarea = ({ ref, className, useMopStyles = true, ...rest }: TextareaProps) => (
  <textarea
    ref={ref}
    className={cn(
      useMopStyles ? "mop-doc-input min-h-20 resize-none" : "",
      className,
    )}
    {...rest}
  />
);

Textarea.displayName = "Textarea";
