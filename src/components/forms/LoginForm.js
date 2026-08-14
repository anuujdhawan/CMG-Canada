"use client";

import { useState } from "react";
import { KeyRound, Lock, User } from "lucide-react";

/** Demo login form — no real authentication in the prototype. */
export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form className="mt-8 space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Client login">
      <div>
        <label htmlFor="login-email" className="mb-1.5 block text-sm font-semibold text-primary">
          Email
        </label>
        <div className="relative">
          <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden />
          <input
            id="login-email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11 w-full rounded-brand-md border border-line bg-white pl-10 pr-3.5 text-sm text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-secondary focus:ring-2 focus:ring-secondary/30"
          />
        </div>
      </div>
      <div>
        <label htmlFor="login-password" className="mb-1.5 block text-sm font-semibold text-primary">
          Password
        </label>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden />
          <input
            id="login-password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-11 w-full rounded-brand-md border border-line bg-white pl-10 pr-3.5 text-sm text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-secondary focus:ring-2 focus:ring-secondary/30"
          />
        </div>
      </div>
      <button
        type="submit"
        disabled
        className="inline-flex w-full items-center justify-center gap-2 rounded-brand-lg bg-primary px-6 py-3 text-[15px] font-semibold text-white opacity-70"
      >
        <KeyRound className="h-4 w-4" aria-hidden />
        Sign in (demo)
      </button>
      <p className="text-center text-xs text-muted">
        No accounts exist in this prototype. Add a real authentication provider (e.g. Auth.js) before client launch.
      </p>
    </form>
  );
}
