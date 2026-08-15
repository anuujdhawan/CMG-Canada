function pathOnly(value) {
  const clean = String(value || "").split(/[?#]/)[0].replace(/^\/+|\/+$/g, "");
  return clean ? `/${clean}` : "/";
}

export function isActivePath(pathname, href) {
  if (!href || /^https?:\/\//.test(href)) return false;
  const current = pathOnly(pathname);
  const base = pathOnly(href);
  return base === "/" ? current === "/" : current === base || current.startsWith(`${base}/`);
}

/**
 * Match a top-level menu item to its own route or one of its actual
 * descendants. Parent prefixes are intentionally not enough: /immigration/work-permit
 * belongs to Work, Study & Visit, not the broader /immigration branch.
 */
export function isActiveNavItem(pathname, item) {
  const descendants = [
    ...(item.columns || []).flatMap((column) => column.items || []),
    ...(item.children || []),
    item.featured,
  ];

  if (descendants.some((link) => link?.href && isActivePath(pathname, link.href))) return true;
  return pathOnly(pathname) === pathOnly(item.href);
}
