import { buildMetadata } from "@/lib/seo";
import ToolShell from "@/components/templates/ToolShell";
import DocumentChecklist from "@/components/tools/DocumentChecklist";

export const metadata = buildMetadata({
  title: "Document Checklist",
  description:
    "A step-by-step checklist of documents needed for common Canadian immigration application types.",
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
