"use client";

import { useCallback, useState } from "react";
import { submitForm } from "@/lib/form-client";

/**
 * Shared submit state machine for demo forms: idle → loading → success/error.
 * `run(payload)` posts to the demo form API and returns whether it succeeded.
 */
export function useFormSubmit(type) {
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [serverError, setServerError] = useState("");

  const run = useCallback(
    async (payload) => {
      setStatus("loading");
      setServerError("");
      const result = await submitForm({ type, ...payload });
      if (result.ok) {
        setStatus("success");
        return true;
      }
      setStatus("error");
      setServerError(result.error || "Something went wrong. Please try again.");
      return false;
    },
    [type]
  );

  return { status, serverError, run };
}
