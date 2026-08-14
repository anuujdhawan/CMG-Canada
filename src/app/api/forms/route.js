import { NextResponse } from "next/server";

/**
 * Demo form endpoint.
 *
 * - Validates required fields.
 * - If FORM_ENDPOINT_URL is configured, forwards the payload there.
 * - Otherwise acknowledges locally (demo mode) so every form on the site
 *   has working loading/success states without a backend.
 *
 * Server-only values (FORM_ENDPOINT_URL, CRM_API_URL, CRM_API_KEY) are
 * read here — never exposed to the browser.
 */

const TYPES = new Set([
  "contact",
  "newsletter",
  "consultation",
  "urgent-consultation",
  "assessment",
]);

const REQUIRED_FIELDS = {
  contact: ["fullName", "email", "topic", "message"],
  newsletter: ["email"],
  consultation: ["fullName", "email", "country", "mode", "preferredDate"],
  "urgent-consultation": ["fullName", "email", "country", "mode", "preferredDate", "deadline"],
  assessment: ["fullName", "email", "country", "currentStatus", "goal"],
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const type = String(body?.type || "");
  if (!TYPES.has(type)) {
    return NextResponse.json({ ok: false, error: "Unknown form type." }, { status: 400 });
  }

  // Basic validation
  const required = REQUIRED_FIELDS[type] || [];
  const missing = required.filter((field) => {
    const value = body?.[field];
    return value === undefined || value === null || String(value).trim() === "";
  });
  if (missing.length > 0) {
    return NextResponse.json(
      { ok: false, error: `Missing required field(s): ${missing.join(", ")}.` },
      { status: 422 }
    );
  }

  const email = String(body.email || "").trim();
  if (email && !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "Please provide a valid email address." }, { status: 422 });
  }

  // Build the clean payload
  const payload = {
    ...body,
    receivedAt: new Date().toISOString(),
    origin: request.headers.get("origin") || "",
  };

  // Forward to the configured endpoint if one exists (CRM / form service).
  const endpoint = process.env.FORM_ENDPOINT_URL || process.env.CRM_API_URL || "";
  if (endpoint) {
    try {
      const forwarded = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(process.env.CRM_API_KEY
            ? { Authorization: `Bearer ${process.env.CRM_API_KEY}` }
            : {}),
        },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(8000),
      });
      if (!forwarded.ok) {
        console.error(`Form forward failed with status ${forwarded.status}`);
      }
    } catch (err) {
      console.error("Form forward error:", err.message);
    }
  }

  // Demo mode: acknowledge success locally.
  return NextResponse.json({ ok: true, demo: !endpoint });
}
