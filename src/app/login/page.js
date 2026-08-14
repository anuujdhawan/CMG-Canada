import { KeyRound } from "lucide-react";
import { site } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import PageHeader from "@/components/ui/PageHeader";
import Disclaimer from "@/components/ui/Disclaimer";
import LoginForm from "@/components/forms/LoginForm";

export const metadata = buildMetadata({
  title: "Client Login",
  description:
    "Client portal login — track your case, upload documents and message your consultant.",
  path: "/login",
});

export default function LoginPage() {
  return (
    <>
      <PageHeader
        eyebrow="Client portal"
        title="Client Login"
        lead="Track your case, upload documents and message your consultant — all in one place. This is a demo shell with no real accounts."
      />

      <section className="section-pad">
        <div className="site-container">
          <div className="mx-auto max-w-md">
            <div className="rounded-brand-2xl border border-line bg-white p-6 shadow-card sm:p-10">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-brand-lg bg-surface-alt text-primary">
                  <KeyRound className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <h2 className="text-lg font-bold text-primary">Sign in</h2>
                  <p className="text-xs text-muted">Email + password · demo placeholder</p>
                </div>
              </div>
              <LoginForm />
            </div>

            <div className="mt-6">
              <Disclaimer />
            </div>
            <p className="mt-6 text-center text-sm text-muted">
              Client? Email{" "}
              <a href={`mailto:${site.email}`} className="font-semibold text-secondary underline underline-offset-2 hover:text-primary">
                {site.email}
              </a>{" "}
              to get portal access.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
