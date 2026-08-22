import {
  Gauge,
  Globe,
  Briefcase,
  MapPin,
  Waves,
  RefreshCw,
  Rocket,
  FileBadge,
  GraduationCap,
  BookOpen,
  Plane,
  HeartHandshake,
  Palmtree,
  Heart,
  Users,
  Users2,
  IdCard,
  ShieldAlert,
  FileX,
  Scale,
  Gavel,
  Building2,
  Zap,
  ClipboardCheck,
  UserSearch,
  ShieldCheck,
  Compass,
  Receipt,
  Clock,
  Calculator,
  Search,
  FileSearch,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

/** Maps data-driven icon names to lucide components. */
const iconMap = {
  Gauge,
  Globe,
  Briefcase,
  MapPin,
  Waves,
  RefreshCw,
  Rocket,
  FileBadge,
  GraduationCap,
  BookOpen,
  Plane,
  HeartHandshake,
  Palmtree,
  Heart,
  Users,
  Users2,
  IdCard,
  ShieldAlert,
  FileX,
  Scale,
  Gavel,
  Building2,
  Zap,
  ClipboardCheck,
  UserSearch,
  ShieldCheck,
  Compass,
  Receipt,
  Clock,
  Calculator,
  Search,
  FileSearch,
  CheckCircle2,
  Sparkles,
};

export default iconMap;

/** Stable fallback used when an icon name is missing from the map. */
export const fallbackIcon = CheckCircle2;

/**
 * Look up an icon by name.
 * Prefer direct `iconMap[name] || fallbackIcon` access inside render
 * (the React Compiler lint requires stable component references).
 */
export function getIcon(name) {
  return iconMap[name] || CheckCircle2;
}
