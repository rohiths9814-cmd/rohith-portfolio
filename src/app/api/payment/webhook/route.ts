// ============================================================
// POST /api/payment/webhook
// ============================================================
// Receives Cashfree webhook events (payment success, failure, etc.)
// Verifies the HMAC-SHA256 signature to prevent spoofing.
//
// Configure this URL in Cashfree Dashboard:
//   Developers → Webhooks → Add: https://rohithsec.in/api/payment/webhook
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    // Get raw body for signature verification
    const rawBody = await req.text();
    const signature = req.headers.get("x-webhook-signature");
    const timestamp = req.headers.get("x-webhook-timestamp");

    if (!signature || !timestamp) {
      console.warn("⚠️ Webhook received without signature headers");
      return NextResponse.json(
        { error: "Missing signature headers" },
        { status: 401 }
      );
    }

    // Verify HMAC-SHA256 signature
    const secretKey = process.env.CASHFREE_CLIENT_SECRET!;
    const expectedSignature = crypto
      .createHmac("sha256", secretKey)
      .update(timestamp + rawBody)
      .digest("base64");

    if (signature !== expectedSignature) {
      console.error("❌ Webhook signature mismatch — possible spoofing!");
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 401 }
      );
    }

    // Signature verified — process the event
    const event = JSON.parse(rawBody);

    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(`🔔 Webhook Event: ${event.type}`);
    console.log(`   Order ID:  ${event.data?.order?.order_id}`);
    console.log(`   Amount:    ₹${event.data?.order?.order_amount}`);
    console.log(`   Status:    ${event.data?.order?.order_status}`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

    // Here you would typically save to a database
    // For now, we just log and acknowledge

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error: unknown) {
    const err = error as { message?: string };
    console.error("❌ Webhook processing error:", err.message);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
