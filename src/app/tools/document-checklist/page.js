import { buildMetadata } from "@/lib/seo";
import { getPage } from "@/lib/sitePages";
import { rebrand } from "@/components/templates/ContentPage";
import ToolShell from "@/components/templates/ToolShell";
import DocumentChecklist from "@/components/tools/DocumentChecklist";

const page = getPage("/tools/document-checklist");

export const metadata = buildMetadata({
  title: rebrand(page?.seo.title || page?.h1 || "Document Checklist"),
  description: rebrand(page?.seo.description || "A step-by-step checklist of documents needed for common Canadian immigration application types."),
  path: "/tools/document-checklist",
});

export default function DocumentChecklistPage() {
  return (
    <ToolShell
      eyebrow="Free tool"
      title="Document Checklist"
      lead="Track the documents you need for the most common application types — with a live progress bar as you go."
      currentSlug="document-checklist"
    >
      <DocumentChecklist />
    </ToolShell>
  );
}
