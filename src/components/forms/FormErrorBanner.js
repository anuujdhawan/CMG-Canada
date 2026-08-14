import { cn } from "@/lib/utils";

/** Accessible error banner shown above the submit button on failed submits. */
export default function FormErrorBanner({ message, className }) {
  if (!message) return null;
  return (
    <p role="alert" className={cn("mt-4 rounded-brand-md bg-error/10 px-4 py-3 text-sm font-medium text-error", className)}>
      {message}
    </p>
  );
}
