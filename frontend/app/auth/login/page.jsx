"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import AuthModal from "./AuthModal";

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginShell />}>
      <LoginPageContent />
    </Suspense>
  );
}

function LoginPageContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") === "signup" ? "signup" : "login";

  return (
    <LoginShell>
      <AuthModal embedded initialTab={initialTab} />
      <div className="text-center mt-6">
        <Link href="/" className="text-sm font-medium text-blue-200 hover:underline">
          Back to home
        </Link>
      </div>
    </LoginShell>
  );
}

function LoginShell({ children = null }) {
  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        {children}
      </div>
    </main>
  );
}
