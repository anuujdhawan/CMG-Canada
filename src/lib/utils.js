/** Small className merge helper (kept dependency-free). */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

/** Simple slugify for search-style matches (not used for routing). */
export function slugify(text) {
  return String(text)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}
