import { NextResponse } from "next/server";
import Stripe from "stripe";
import { site } from "@/config/site";

export const runtime = "nodejs";

/**
 * Creates a Stripe Checkout session for a client-entered amount and returns
 * the hosted checkout URL to redirect to. Reads STRIPE_SECRET_KEY, which is
 * blank until the client adds their real Stripe keys to .env.
 */
function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  return key ? new Stripe(key) : null;
}

export async function POST(request) {
  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json(
      { error: "Online payments aren't set up yet. Please contact us to arrange payment." },
      { status: 503 }
    );
  }

  const body = await request.json().catch(() => ({}));
  const amount = Number(body.amount);
  const description = String(body.description || "").trim().slice(0, 200) || "Professional services";

  if (!Number.isFinite(amount) || amount < 1 || amount > 50000) {
    return NextResponse.json({ error: "Enter a valid amount between $1 and $50,000 CAD." }, { status: 400 });
  }

  const origin = request.headers.get("origin") || site.url || "http://localhost:3000";

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "cad",
            product_data: { name: description },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/pay/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/contact/pay-immigration-consultation-canada`,
    });

    return NextResponse.json({ url: session.url });
  } catch {
    return NextResponse.json({ error: "Could not start checkout. Please try again." }, { status: 500 });
  }
}
