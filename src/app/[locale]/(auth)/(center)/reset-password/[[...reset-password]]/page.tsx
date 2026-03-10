import { Suspense } from "react";

import { ResetPassword } from "@/components";

export default async function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-gray-500">Loading...</p>
        </div>
      }
    >
      <ResetPassword />
    </Suspense>
  );
}
