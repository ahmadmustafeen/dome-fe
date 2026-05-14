'use client'
import { Button } from "@/components";

export default function DocumentGeneratorPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="w-full max-w-2xl rounded-2xl border border-gray-200 bg-white p-10 shadow-sm">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h6m-6 4h6M7 4h7l5 5v11a1 1 0 01-1 1H7a1 1 0 01-1-1V5a1 1 0 011-1z"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-gray-900">
            Document Generator
          </h1>

          <p className="mt-3 max-w-md text-sm text-gray-500">
            This feature is coming soon, here you can see all generated documents and comment on each to improve the quality.
            Milestone 4
          </p>

          <div className="w-40 mx-auto py-5">
            <Button text="Coming Soon" onClick={() => { }} />
          </div>
        </div>
      </div>
    </div>
  )
}