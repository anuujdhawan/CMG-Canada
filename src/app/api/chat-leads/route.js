import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value, maxLength = 500) {
  return String(value || "").trim().slice(0, maxLength);
}

function escapeHtml(value) {
  return clean(value).replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  }[character]));
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const fullName = clean(body?.fullName, 120);
  const email = clean(body?.email, 160).toLowerCase();
  const consent = body?.consent === true;

  if (!fullName || !email || !consent) {
    return NextResponse.json({ ok: false, error: "Name, email and contact consent are required." }, { status: 422 });
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "Please provide a valid email address." }, { status: 422 });
  }

  const recipient = clean(process.env.CHAT_LEAD_EMAIL, 160);
  const resendApiKey = clean(process.env.RESEND_API_KEY, 240);
  const sender = clean(process.env.CHAT_LEAD_FROM, 240);

  if (!recipient || !resendApiKey || !sender) {
    console.error("Guided chat lead email is not configured. Set CHAT_LEAD_EMAIL, RESEND_API_KEY and CHAT_LEAD_FROM in .env.");
    return NextResponse.json({ ok: false, error: "Lead delivery is not configured yet." }, { status: 503 });
  }

  const service = clean(body?.service, 100) || "Not selected";
  const answers = body?.answers && typeof body.answers === "object" ? body.answers : {};
  const answerRows = Object.entries(answers)
    .slice(0, 20)
    .map(([key, value]) => `<tr><td style="padding:6px 12px 6px 0;color:#6b5560;">${escapeHtml(key)}</td><td style="padding:6px 0;font-weight:600;">${escapeHtml(value)}</td></tr>`)
    .join("");

  const subject = `New guided-chat lead — ${service}`;
  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.5;color:#21181b;">
      <h2 style="color:#c8102e;margin-bottom:6px;">New guided-chat lead</h2>
      <p style="margin-top:0;color:#6b5560;">A visitor requested contact after using the pathway guide.</p>
      <table style="border-collapse:collapse;margin:18px 0;">
        <tr><td style="padding:6px 12px 6px 0;color:#6b5560;">Name</td><td style="padding:6px 0;font-weight:600;">${escapeHtml(fullName)}</td></tr>
        <tr><td style="padding:6px 12px 6px 0;color:#6b5560;">Email</td><td style="padding:6px 0;font-weight:600;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
        <tr><td style="padding:6px 12px 6px 0;color:#6b5560;">Pathway</td><td style="padding:6px 0;font-weight:600;">${escapeHtml(service)}</td></tr>
        ${answerRows}
      </table>
      <p style="font-size:12px;color:#6b5560;">Submitted: ${escapeHtml(new Date().toISOString())}</p>
    </div>`;

  try {
    const resend = new Resend(resendApiKey);
    const { error } = await resend.emails.send({
      from: sender,
      to: [recipient],
      replyTo: email,
      subject,
      html,
    });

    if (error) {
      console.error("Guided chat email failed:", error);
      return NextResponse.json({ ok: false, error: "The lead could not be sent." }, { status: 502 });
    }
  } catch (error) {
    console.error("Guided chat email error:", error.message);
    return NextResponse.json({ ok: false, error: "The lead could not be sent." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
