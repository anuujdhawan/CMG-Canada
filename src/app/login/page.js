import { KeyRound } from "lucide-react";
import { site } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import PageHeader from "@/components/ui/PageHeader";
import Disclaimer from "@/components/ui/Disclaimer";
import LoginForm from "@/components/forms/LoginForm";
import DarkRedPathwaySection from "@/components/sections/DarkRedPathwaySection";
import ToolsShowcase from "@/components/sections/ToolsShowcase";
import PageFaqSection from "@/components/sections/PageFaqSection";
import { getPageFaqs } from "@/lib/faqs";

export const metadata = buildMetadata({
  title: "Client Login",
  description:
    "Client portal login — track your case, upload documents and message your consultant.",
  path: "/login",
});

const LOGIN_FAQ_PAGE = {
  path: "/login",
  h1: "Client Login",
  seo: { description: "Track your case, upload documents and message your consultant in one secure client portal." },
};

export default function LoginPage() {
  return (
    <>
      <PageHeader
        eyebrow="Client portal"
        title="Client Login"
        lead="Track your case, upload documents and message your consultant — all in one place. This is a demo shell with no real accounts."
      />

      <DarkRedPathwaySection variant="portal" className="homepage-pathways" />

      <section className="content-stage section-pad">
        <div className="site-container">
          <div className="mx-auto max-w-md">
            <div className="article-shell rounded-brand-2xl p-6 sm:p-10">
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

      <ToolsShowcase />
      <PageFaqSection page={LOGIN_FAQ_PAGE} items={getPageFaqs(LOGIN_FAQ_PAGE)} />
    </>
  );
}
