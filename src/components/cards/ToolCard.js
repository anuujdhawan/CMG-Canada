import iconMap, { fallbackIcon } from "@/lib/icons";
import CardShell from "./CardShell";
import CardIconBox from "./CardIconBox";
import CardArrowLink from "./CardArrowLink";

export default function ToolCard({ tool }) {
  const Icon = iconMap[tool.icon] || fallbackIcon;
  return (
    <CardShell href={`/tools/${tool.slug}`} className="group">
      <CardIconBox>
        <Icon className="h-5 w-5" aria-hidden />
      </CardIconBox>
      <h3 className="mt-5 text-base font-bold text-primary">{tool.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{tool.description}</p>
      <CardArrowLink label="Open tool" />
    </CardShell>
  );
}
