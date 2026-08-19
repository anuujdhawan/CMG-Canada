import { buildMetadata } from "@/lib/seo";
import { getPage } from "@/lib/sitePages";
import { rebrand } from "@/components/templates/ContentPage";
import ToolShell from "@/components/templates/ToolShell";
import DocumentChecklist from "@/components/tools/DocumentChecklist";

const pagePath = "/tools/document-checklist-canada";
const page = getPage(pagePath);

export const metadata = buildMetadata({
  title: rebrand(page?.seo.title || page?.h1 || "Document Checklist"),
  description: rebrand(page?.seo.description || "A step-by-step checklist of documents needed for common Canadian immigration application types."),
  path: pagePath,
});

export default function DocumentChecklistPage() {
  return (
    <ToolShell
      eyebrow="Free tool"
      title="Document Checklist"
      lead="Track the documents you need for the most common application types — with a live progress bar as you go."
      pagePath={pagePath}
    >
      <DocumentChecklist />
    </ToolShell>
  );
}
